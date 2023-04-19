const DriverService = require("../../services/DriverService");
const { validationResult } = require("express-validator");

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const validationErrors = {};
    errors.array().forEach((error) => {
      validationErrors[error.path] = error.msg;
    });
    return res.status(400).send({ validationErrors: validationErrors });
  }

  await DriverService.save(req.body);
  return res.send({ message: "Driver created" });
};

module.exports = register;
