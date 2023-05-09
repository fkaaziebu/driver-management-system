const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Model = Sequelize.Model;

class AdminToken extends Model {}

AdminToken.init(
  {
    token: {
      type: Sequelize.STRING,
    },
    lastUsedAt: {
      type: Sequelize.DATE,
    },
  },
  { sequelize, modelName: "adminToken", timestamps: false }
);

module.exports = AdminToken;
