const express = require("express");
const DriverRouter = require("./driver/DriverRouter.js");
const AuthenticationRouter = require("./auth/AuthenticationRouter.js");
const cors = require("cors");
const helmet = require("helmet");
const ErrorHandler = require("./error/ErrorHandler.js");

const app = express();

/* MIDDLEWARE CONFIGS */
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());

/* ROUTES */
app.use(DriverRouter);
app.use(AuthenticationRouter);

app.use(ErrorHandler);

module.exports = app;
