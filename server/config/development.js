module.exports = {
  database: {
    database: "driver-management",
    username: "driver-management",
    password: "db-p4ss",
    dialect: "sqlite",
    storage: "./database.sqlite",
    logging: false,
  },
  mail: {
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "timmothy.keeling57@ethereal.email",
      pass: "f7XmsquRGbb1BEe7zJ",
    },
  },
  uploadDir: "uploads-dev",
  profileDir: "profile",
};
