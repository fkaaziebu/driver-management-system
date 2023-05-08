const Sequelize = require("sequelize");
const sequelize = require("../config/database");
const Token = require("../auth/Token");

const Model = Sequelize.Model;

class Admin extends Model {}

Admin.init(
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
    houseNumber: {
      type: Sequelize.STRING,
    },
    streetName: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },
    country: {
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
  { sequelize, modelName: "admin" }
);

Admin.hasMany(Token, { onDelete: "cascade", foreignKey: "userId" });

module.exports = Admin;
