const Sequelize = require("sequelize");
const sequelize = require("../config/database");
const DriverToken = require("../auth/DriverToken");

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
    image: {
      type: Sequelize.STRING,
    },
  },
  { sequelize, modelName: "driver" }
);

Driver.hasMany(DriverToken, { onDelete: "cascade", foreignKey: "userId" });

module.exports = Driver;
