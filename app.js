const express = require("express");
const authRoutes = require("./routes/auth.js");

const app = express();

/* ROUTES */
app.use(authRoutes);

module.exports = app;
