const bcrypt = require("bcrypt");
const { randomString } = require("../shared/generator");
const sequelize = require("../config/database");
const EmailService = require("../email/EmailService");
const EmailException = require("../email/EmailException");
const NotFoundException = require("../error/NotFoundException");
const InvalidTokenException = require("../error/InvalidTokenException");
const Admin = require("./Admin");
const FileService = require("../file/FileService");

const save = async (body) => {
  // Get all information for creating a user from the request body
  const {
    username,
    email,
    contact,
    password,
    houseNumber,
    streetName,
    city,
    country,
  } = body;
  // create a hash of the password to be stored in the password field
  const hash = await bcrypt.hash(password, 10);
  // Create a serialized object of user to store
  const user = {
    username,
    email,
    contact,
    password: hash,
    houseNumber,
    streetName,
    city,
    country,
    activationToken: randomString(10),
  };
  // Call the sequelize transaction instance
  // This tells sequelize to wait until a commit before saving user
  const transaction = await sequelize.transaction();
  // Create a User with the above user information and wait to receive a commit
  await Admin.create(user, { transaction });
  try {
    // Sendan email to the users email
    await EmailService.sendAccountActivationAdmin(email, user.activationToken);
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
  return await Admin.findOne({ where: { email: email } });
};

const activate = async (token) => {
  // Finds a client with this particular token
  const user = await Admin.findOne({ where: { activationToken: token } });
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

const updateUser = async (id, updatedBody) => {
  // Find the Driver with this particular id
  const user = await Admin.findOne({ where: { id: id } });
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

const getAdmin = async (id) => {
  const user = await Admin.findOne({
    where: { id: id, inactive: false },
    attributes: ["id", "username", "email", "image"],
  });
  if (!user) {
    throw new NotFoundException("User not found");
  }
  return user;
};

module.exports = { save, findByEmail, activate, updateUser, getAdmin };
