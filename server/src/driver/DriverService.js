const Driver = require("./Driver");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const EmailService = require("../email/EmailService");
const sequelize = require("../config/database");
const EmailException = require("../email/EmailException");
const InvalidTokenException = require("./InvalidTokenException");
const NotFoundException = require("../error/NotFoundException");

const generateToken = (length) => {
  return crypto.randomBytes(length).toString("hex").substring(0, length);
};

const save = async (body) => {
  const { username, email, contact, password } = body;
  const hash = await bcrypt.hash(password, 10);
  const user = {
    username,
    email,
    contact,
    password: hash,
    activationToken: generateToken(10),
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
    attributes: ["id", "username", "email"],
  });
  if (!user) {
    throw new NotFoundException("User not found");
  }
  return user;
};

module.exports = { save, findByEmail, activate, getUser };
