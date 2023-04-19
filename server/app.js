const express = require("express");
const driverAuthRoutes = require("./src/routes/driver/auth.js");

const app = express();

/* MIDDLEWARE CONFIGS */
app.use(express.json());

/* ROUTES */
app.use(driverAuthRoutes);

module.exports = app;
