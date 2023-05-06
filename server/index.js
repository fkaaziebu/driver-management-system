const app = require("./src/app");
const sequelize = require("./src/config/database");
const TokenService = require("./src/auth/TokenService");

sequelize.sync({ force: true });

TokenService.scheduleCleanup();

app.listen(5001, () => console.log("App is running!"));
