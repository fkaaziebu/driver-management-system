const express = require("express");
const driverAuthRoutes = require("./src/routes/driver/auth.js");
const cors = require("cors");

const app = express();

/* MIDDLEWARE CONFIGS */
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());

/* ROUTES */
app.use(driverAuthRoutes);

module.exports = app;
