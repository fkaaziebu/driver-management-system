const DriverService = require("../../services/DriverService");

const getDriver = async (req, res, next) => {
  try {
    const user = await DriverService.getUser(req.params.id);
    res.send(user);
  } catch (err) {
    next(err);
  }
};

module.exports = getDriver;
