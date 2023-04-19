const express = require("express");
const register = require("../../controllers/driver/auth");
const { check } = require("express-validator");
const DriverService = require("../../services/DriverService");

const router = express.Router();

router.post(
  "/api/1.0/drivers/auth",
  check("username")
    .notEmpty()
    .withMessage("Username cannot be null")
    .bail()
    .isLength({ min: 4, max: 32 })
    .withMessage("Must have min 4 and max 32 characters"),
  check("email")
    .notEmpty()
    .withMessage("Email cannot be null")
    .bail()
    .isEmail()
    .withMessage("Email is not valid")
    .bail()
    .custom(async (email) => {
      const user = await DriverService.findByEmail(email);
      if (user) {
        throw new Error("Email in use");
      }
    }),
  check("contact")
    .notEmpty()
    .withMessage("Contact cannot be null")
    .bail()
    .isLength({ min: 10, max: 10 })
    .withMessage("Must be equal to 10 characters"),
  check("password")
    .notEmpty()
    .withMessage("Password cannot be null")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 characters")
    .bail()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)
    .withMessage(
      "Password must have at least 1 uppercase, 1 lowercase letter and 1 number"
    ),
  register
);

module.exports = router;
