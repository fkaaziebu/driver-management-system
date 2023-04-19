const DriverService = require("../../services/DriverService");

const register = async (req, res) => {
  if (!req.body.username) {
    return res.status(400).send({ validationErrors: {username: "Username cannot be null"} });
  }
  if (!req.body.email) {
    return res.status(400).send({validationErrors: {email: "Email cannot be null"}})
  }
  await DriverService.save(req.body);
  return res.send({ message: "Driver created" });
};

module.exports = register;
