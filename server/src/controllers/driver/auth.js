const ValidationException = require("../../error/ValidationException");
const DriverService = require("../../services/DriverService");
const { validationResult } = require("express-validator");

const register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ValidationException(errors.array()));
  }
  try {
    await DriverService.save(req.body);
    return res.send({ message: "Driver created" });
  } catch (err) {
    next(err);
  }
};

module.exports = register;
