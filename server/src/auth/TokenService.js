const jwt = require("jsonwebtoken");

const createToken = (user) => {
  return jwt.sign({ id: user.id }, "this-is-jsonwebtoken-secret");
};

const verify = (token) => {
  return jwt.verify(token, "this-is-jsonwebtoken-secret");
};

module.exports = { createToken, verify };
