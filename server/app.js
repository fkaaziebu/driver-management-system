const express = require("express");
const driverAuthRoutes = require("./src/routes/driver/auth.js");

const app = express();

/* ROUTES */
app.use(driverAuthRoutes);

module.exports = app;
