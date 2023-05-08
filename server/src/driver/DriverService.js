const Driver = require("./Driver");
const bcrypt = require("bcrypt");
const EmailService = require("../email/EmailService");
const sequelize = require("../config/database");
const EmailException = require("../email/EmailException");
const InvalidTokenException = require("../error/InvalidTokenException");
const NotFoundException = require("../error/NotFoundException");
const { randomString } = require("../shared/generator");
const FileService = require("../file/FileService");

const save = async (body) => {
  // Get all information for creating a user from the request body
  const { username, email, contact, password } = body;
  // create a hash of the password to be stored in the password field
  const hash = await bcrypt.hash(password, 10);
  // Create a serialized object of user to store
  const user = {
    username,
    email,
    contact,
    password: hash,
    activationToken: randomString(10),
  };
  // Call the sequelize transaction instance
  // This tells sequelize to wait until a commit before saving user
  const transaction = await sequelize.transaction();
  // Create a User with the above user information and wait to receive a commit
  await Driver.create(user, { transaction });
  try {
    // Sendan email to the users email
    await EmailService.sendAccountActivationDriver(email, user.activationToken);
    // If email sent successfully, commit the user
    await transaction.commit();
  } catch (err) {
    // If the email sending Failed, don't save user to database
    await transaction.rollback();
    // Return an appropriate error body to client
    throw new EmailException();
  }
};

const findByEmail = async (email) => {
  // Finds and returns the user with this particular email
  return await Driver.findOne({ where: { email: email } });
};

const activate = async (token) => {
  // Finds a client with this particular token
  const user = await Driver.findOne({ where: { activationToken: token } });
  // If a user doesn't exist with this token return an invalid token error
  if (!user) {
    throw new InvalidTokenException();
  }
  // Change the inactive field of user to false and 
  // make the activation token field empty
  user.inactive = false;
  user.activationToken = null;
  // save the user updated fields to database
  await user.save();
};

const getUser = async (id) => {
  const user = await Driver.findOne({
    where: { id: id, inactive: false },
    attributes: ["id", "username", "email", "image"],
  });
  if (!user) {
    throw new NotFoundException("User not found");
  }
  return user;
};

const updateUser = async (id, updatedBody) => {
  // Find the Driver with this particular id
  const user = await Driver.findOne({ where: { id: id } });
  // Update their fields
  user.username = updatedBody.username;
  /**
   * Update the user's image only when they upload an image
   * Old images are deleted as well to prevent storing of old images
   */
  if (updatedBody.image) {
    if (user.image) {
      // Delete exiting image if any
      await FileService.deleteProfileImage(user.image);
    }
    // Save new image to folder and name to database
    user.image = await FileService.saveProfileImage(updatedBody.image);
  }
  // Save the field after the update
  await user.save();
  // Return appropriate body after an update
  // especially username and image since they are the ones to be updated
  return {
    id: id,
    username: user.username,
    email: user.email,
    image: user.image,
  };
};

const deleteUser = async (id) => {
  // Remove driver with this id from Driver table
  await Driver.destroy({ where: { id: id } });
};

module.exports = {
  save,
  findByEmail,
  activate,
  getUser,
  updateUser,
  deleteUser,
};
