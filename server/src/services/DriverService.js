const Driver = require("../models/Driver");
const bcrypt = require("bcrypt");

const save = async (body) => {
  const { username, email, contact, password } = body;
  const hash = await bcrypt.hash(password, 10);
  const user = {
    username,
    email,
    contact,
    password: hash,
  };
  await Driver.create(user);
};

module.exports = { save };
