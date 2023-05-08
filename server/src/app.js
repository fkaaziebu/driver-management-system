const express = require("express");
const DriverRouter = require("./driver/DriverRouter.js");
const AuthenticationRouter = require("./auth/AuthenticationRouter.js");
const AdminRouter = require("./admin/AdminRouter.js")
const cors = require("cors");
const helmet = require("helmet");
const ErrorHandler = require("./error/ErrorHandler.js");
const tokenAuthentication = require("./middleware/tokenAuthentication");
const FileService = require("./file/FileService");
const config = require("config");
const path = require("path");

const { uploadDir, profileDir } = config;
const profileFolder = path.join(".", uploadDir, profileDir);

const ONE_YEAR_IN_MILLIS = 365 * 24 * 60 * 60 * 1000;

FileService.createFolders();

const app = express();

/* MIDDLEWARE CONFIGS */
app.use(express.json({ limit: "3mb" }));

app.use(
  "/images",
  express.static(profileFolder, { maxAge: ONE_YEAR_IN_MILLIS })
);
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());

/* ROUTES */
app.use(tokenAuthentication);

app.use(DriverRouter);

app.use(AdminRouter);

app.use(AuthenticationRouter);

// app.use(loggerF);
/* ERROR HANDLER */

app.use(ErrorHandler);

module.exports = app;
