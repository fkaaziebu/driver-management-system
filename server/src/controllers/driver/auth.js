const DriverService = require("../../services/DriverService");

const register = async (req, res) => {
  if (!req.body.username) {
    return res.status(400).send({ validationErrors: {} });
  }
  await DriverService.save(req.body);
  return res.send({ message: "Driver created" });
};

module.exports = register;
