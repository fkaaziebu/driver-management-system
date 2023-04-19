const DriverService = require("../../services/DriverService");

const register = async (req, res) => {
  await DriverService.save(req.body);
  return res.send({ message: "Driver created" });
};

module.exports = register;
