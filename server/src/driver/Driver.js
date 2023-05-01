const Sequelize = require("sequelize");
const sequelize = require("../config/database");
const Token = require("../auth/Token");

const Model = Sequelize.Model;

class Driver extends Model {}

Driver.init(
  {
    username: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    contact: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    inactive: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    activationToken: {
      type: Sequelize.STRING,
    },
  },
  { sequelize, modelName: "driver" }
);

Driver.hasMany(Token, { onDelete: "cascade", foreignKey: "userId" });

module.exports = Driver;
