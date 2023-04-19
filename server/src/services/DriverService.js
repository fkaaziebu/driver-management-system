const Driver = require("../models/Driver");

const save = async (body) => {
  await Driver.create(body);
};

module.exports = { save };
