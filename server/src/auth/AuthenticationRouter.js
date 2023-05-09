const express = require("express");
const DriverService = require("../driver/DriverService");
const AdminService = require("../admin/AdminService");
const AuthenticationException = require("./AuthenticationException");
const bcrypt = require("bcrypt");
const ForbiddenException = require("../error/ForbiddenException");
const { check, validationResult } = require("express-validator");
const DriverTokenService = require("./DriverTokenService");
const AdminTokenService = require("./AdminTokenService");
const loggerF = require("../logs/loggerF");
const driverTokenAuthentication = require("../middleware/driverTokenAuthentication");

const router = express.Router();

/* DRIVER LOGIN ROUTE */
/**
 * This route generates a token of user to be stored on the frontend for authentication purposes
 * It checks whether the user details are correct and generates a random token for that user
 */
router.post(
  "/api/1.0/auth/drivers",
  // email validation using express
  check("email").isEmail(),
  async (req, res, next) => {
    // Logging All Request coming to this endpoint
    loggerF("", req);
    // Checking for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // incorrect credentials for validation errors
      return next(new AuthenticationException());
    }

    // Get email & password from request body
    const { email, password } = req.body;
    // Find the user with the particular email
    const user = await DriverService.findByEmail(email);
    if (!user) {
      // Returns incorrect credentials if the user does not exist
      // This is to prevent the user or a hacker from guessing emails
      return next(new AuthenticationException());
    }

    // Check whether the password provided matches with the one in database
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      // Return incorrect credentials as well here
      return next(new AuthenticationException());
    }

    // Check if that user is activated
    // Only activated users can log into the system
    if (user.inactive) {
      // Returns the appropriate error message so they know they are not activated
      return next(new ForbiddenException());
    }

    // Create token to be sent to the frontend
    const token = await DriverTokenService.createToken(user);
    // Send token along with user id and username which will be stored for authentication purposes
    return res.send({
      id: user.id,
      username: user.username,
      image: user.image,
      token,
    });
  }
);

/* DRIVER LOGOUT ROUTE */
router.post("/api/1.0/drivers/logout", async (req, res) => {
  // Logging All Request coming to this endpoint
  loggerF("", req);
  // Check for an authorization header
  const authorization = req.headers.authorization;
  if (authorization) {
    // If an authorization header exist, get token from it
    const token = authorization.substring(7);
    // Delete that particular token of user from token table
    await DriverTokenService.deleteToken(token);
  }
  res.send();
});

/* ADMIN LOGIN ROUTE */
/**
 * This route generates a token of user to be stored on the frontend for authentication purposes
 * It checks whether the user details are correct and generates a random token for that user
 */
router.post(
  "/api/1.0/auth/admins",
  // email validation using express
  check("email").isEmail(),
  async (req, res, next) => {
    // Checking for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // incorrect credentials for validation errors
      return next(new AuthenticationException());
    }

    // Get email & password from request body
    const { email, password } = req.body;
    // Find the user with the particular email
    const user = await AdminService.findByEmail(email);
    if (!user) {
      // Returns incorrect credentials if the user does not exist
      // This is to prevent the user or a hacker from guessing emails
      return next(new AuthenticationException());
    }

    // Check whether the password provided matches with the one in database
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      // Return incorrect credentials as well here
      return next(new AuthenticationException());
    }

    // Check if that user is activated
    // Only activated users can log into the system
    if (user.inactive) {
      // Returns the appropriate error message so they know they are not activated
      return next(new ForbiddenException());
    }

    // Create token to be sent to the frontend
    const token = await AdminTokenService.createToken(user);
    // Send token along with user id and username which will be stored for authentication purposes
    return res.send({
      id: user.id,
      username: user.username,
      image: user.image,
      token,
    });
  }
);

router.post("/api/1.0/admins/logout", async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    // If an authorization header exist, get token from it
    const token = authorization.substring(7);
    // Delete that particular token of user from token table
    await AdminTokenService.deleteToken(token);
  }
  res.send();
});

module.exports = router;
