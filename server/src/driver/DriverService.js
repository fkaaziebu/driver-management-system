const Driver = require("./Driver");
const bcrypt = require("bcrypt");
const EmailService = require("../email/EmailService");
const sequelize = require("../config/database");
const EmailException = require("../email/EmailException");
const InvalidTokenException = require("./InvalidTokenException");
const NotFoundException = require("../error/NotFoundException");
const { randomString } = require("../shared/generator");
const FileService = require("../file/FileService");

const save = async (body) => {
  const { username, email, contact, password } = body;
  const hash = await bcrypt.hash(password, 10);
  const user = {
    username,
    email,
    contact,
    password: hash,
    activationToken: randomString(10),
  };
  const transaction = await sequelize.transaction();
  await Driver.create(user, { transaction });
  try {
    await EmailService.sendAccountActivation(email, user.activationToken);
    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    throw new EmailException();
  }
};

const findByEmail = async (email) => {
  // Finds and returns the user with this particular email
  return await Driver.findOne({ where: { email: email } });
};

const activate = async (token) => {
  const user = await Driver.findOne({ where: { activationToken: token } });
  if (!user) {
    throw new InvalidTokenException();
  }
  user.inactive = false;
  user.activationToken = null;
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
  if (updatedBody.image) {
    if (user.image) {
      await FileService.deleteProfileImage(user.image);
    }
    user.image = await FileService.saveProfileImage(updatedBody.image);
  }
  // Save the field after the update
  await user.save();
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
