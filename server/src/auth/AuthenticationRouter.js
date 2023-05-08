const express = require("express");
const DriverService = require("../driver/DriverService");
const AuthenticationException = require("./AuthenticationException");
const tokenAuthentication = require("../middleware/tokenAuthentication");
const bcrypt = require("bcrypt");
const ForbiddenException = require("../error/ForbiddenException");
const { check, validationResult } = require("express-validator");
const TokenService = require("./TokenService");
const loggerF = require("../logs/loggerF");

const router = express.Router();

/* LOGIN ROUTE */
/**
 * This route generates a token of user to be stored on the frontend for authentication purposes
 * It checks whether the user details are correct and generates a random token for that user
 */
router.post(
  "/api/1.0/auth",
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
    const token = await TokenService.createToken(user);
    // Send token along with user id and username which will be stored for authentication purposes
    return res.send({
      id: user.id,
      username: user.username,
      image: user.image,
      token,
    });
  }
);

/* LOGOUT ROUTE */
router.post("/api/1.0/logout", async (req, res) => {
  // Logging All Request coming to this endpoint
  loggerF("", req);
  // Check for an authorization header
  const authorization = req.headers.authorization;
  if (authorization) {
    // If an authorization header exist, get token from it
    const token = authorization.substring(7);
    // Delete that particular token of user from token table
    await TokenService.deleteToken(token);
  }
  res.send();
});

module.exports = router;
