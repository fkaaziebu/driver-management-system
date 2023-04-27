const express = require("express");
const DriverService = require("../driver/DriverService");
const AuthenticationException = require("./AuthenticationException");
const bcrypt = require("bcrypt");
const ForbiddenException = require("./ForbiddenException");
const { check, validationResult } = require("express-validator");

const router = express.Router();

router.post(
  "/api/1.0/auth",
  check("email").isEmail(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new AuthenticationException());
    }

    const { email, password } = req.body;
    const user = await DriverService.findByEmail(email);
    if (!user) {
      return next(new AuthenticationException());
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return next(new AuthenticationException());
    }

    if (user.inactive) {
      return next(new ForbiddenException());
    }

    return res.send({ id: user.id, username: user.username });
  }
);

module.exports = router;