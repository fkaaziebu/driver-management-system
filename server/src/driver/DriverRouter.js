const express = require("express");
const { check, validationResult } = require("express-validator");
const DriverService = require("./DriverService");
const ValidationException = require("../error/ValidationException");
const en = require("../../locales/en/translation.json");
const ForbiddenException = require("../error/ForbiddenException");
const basicAuthentication = require("../middleware/basicAuthentication");

const router = express.Router();

router.post(
  "/api/1.0/drivers",
  check("username")
    .notEmpty()
    .withMessage(en.username_null)
    .bail()
    .isLength({ min: 4, max: 32 })
    .withMessage(en.username_size),
  check("email")
    .notEmpty()
    .withMessage(en.email_null)
    .bail()
    .isEmail()
    .withMessage(en.email_invalid)
    .bail()
    .custom(async (email) => {
      const user = await DriverService.findByEmail(email);
      if (user) {
        throw new Error(en.email_inuse);
      }
    }),
  check("contact")
    .notEmpty()
    .withMessage(en.contact_null)
    .bail()
    .isLength({ min: 10, max: 10 })
    .withMessage(en.contact_size),
  check("password")
    .notEmpty()
    .withMessage(en.password_null)
    .bail()
    .isLength({ min: 6 })
    .withMessage(en.password_size)
    .bail()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)
    .withMessage(en.password_pattern),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationException(errors.array()));
    }
    try {
      await DriverService.save(req.body);
      return res.send({ message: en.user_create_success });
    } catch (err) {
      next(err);
    }
  }
);

router.post("/api/1.0/drivers/token/:token", async (req, res, next) => {
  const token = req.params.token;
  try {
    await DriverService.activate(token);
    res.send({ message: en.account_activation_success });
  } catch (err) {
    next(err);
  }
});

// router.get("/api/1.0/drivers/:id", async (req, res, next) => {
//   try {
//     const user = await DriverService.getUser(req.params.id);
//     res.send(user);
//   } catch (err) {
//     next(err);
//   }
// });

router.put(
  "/api/1.0/drivers/:id",
  basicAuthentication,
  async (req, res, next) => {
    const authenticatedUser = req.authenticatedUser;
    
    if (!authenticatedUser || authenticatedUser.id != req.params.id) {
      return next(new ForbiddenException(en.unauthorized_user_update));
    }
    await DriverService.updateUser(req.params.id, req.body);
    return res.send();
  }
);

module.exports = router;
