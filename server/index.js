const app = require("./src/app");
const sequelize = require("./src/config/database");
const DriverTokenService = require("./src/auth/DriverTokenService");
const AdminTokenService = require("./src/auth/AdminTokenService");
const bcrypt = require("bcrypt");
const Driver = require("./src/driver/Driver");

const addUsers = async (activeUserCount, inactiveUserCount = 0) => {
  const hash = await bcrypt.hash("P4ssword", 10);
  for (let i = 0; i < activeUserCount + inactiveUserCount; i++) {
    await Driver.create({
      username: `user${i + 1}`,
      email: `user${i + 1}@mail.com`,
      password: hash,
      inactive: i >= activeUserCount,
    });
  }
};

sequelize.sync({ force: true }).then(async () => {
  await addUsers(25);
});

sequelize.sync({ force: true });

DriverTokenService.scheduleCleanup();
AdminTokenService.scheduleCleanup();

app.listen(5001, () => console.log("App is running!"));
