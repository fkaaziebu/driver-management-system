const express = require("express");
const register = require("../../controllers/driver/auth");
const { check } = require("express-validator");

const router = express.Router();

router.post(
  "/api/1.0/drivers/auth",
  check("username").notEmpty().withMessage("Username cannot be null"),
  check("email").notEmpty().withMessage("Email cannot be null"),
  check("contact").notEmpty().withMessage("Contact cannot be null"),
  check("password").notEmpty().withMessage("Password cannot be null"),
  register
);

module.exports = router;
