const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    "driver-management",
    "driver-management-user",
    "P4ssword",
    {
        dialect: "sqlite",
        storage: "./database.sqlite",
        logging: false
    }
)