const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Model = Sequelize.Model;

class DriverToken extends Model {}

DriverToken.init(
  {
    token: {
      type: Sequelize.STRING,
    },
    lastUsedAt: {
      type: Sequelize.DATE,
    },
  },
  { sequelize, modelName: "token", timestamps: false }
);

module.exports = DriverToken;
