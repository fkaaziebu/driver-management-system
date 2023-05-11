const express = require("express");
const AdminService = require("./AdminService");
const en = require("../../locales/en/translation.json");
const { check, validationResult } = require("express-validator");
const ValidationException = require("../error/ValidationException");
const ForbiddenException = require("../error/ForbiddenException");
const adminTokenAuthentication = require("../middleware/adminTokenAuthentication");
const FileService = require("../file/FileService");

const router = express.Router();

router.use(adminTokenAuthentication);

router.post(
  "/api/1.0/admins",
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
      // Custom error validation for email
      // This makes sure email is unique
      const user = await AdminService.findByEmail(email);
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
  check("houseNumber")
    .notEmpty()
    .withMessage(en.houseNumber_null)
    .bail()
    .isLength({ min: 3 })
    .withMessage(en.houseNumber_size),
  check("streetName")
    .notEmpty()
    .withMessage(en.streetName_null)
    .bail()
    .isLength({ min: 3 })
    .withMessage(en.streetName_size),
  check("city")
    .notEmpty()
    .withMessage(en.city_null)
    .bail()
    .isLength({ min: 3 })
    .withMessage(en.city_size),
  check("country")
    .notEmpty()
    .withMessage(en.country_null)
    .bail()
    .isLength({ min: 3 })
    .withMessage(en.country_size),
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
    // If Errors occur as a result of validation
    // return an appropriate error message to frontend
    if (!errors.isEmpty()) {
      // Error handler for validation issues
      return next(new ValidationException(errors.array()));
    }

    try {
      // Create and save user to database
      await AdminService.save(req.body);
      // Return an appropriate message if user was successfully created
      return res.send({ message: en.user_create_success });
    } catch (err) {
      // Return Error from AdminService to express error handler if error occured
      // As a result of saving user to database
      /**
       * Errors that could occur include
       * 1. Email Failure
       */
      next(err);
    }
  }
);

/* ADMIN ACTIVATION ROUTE */
router.post("/api/1.0/admins/token/:token", async (req, res, next) => {
  // Get the token passed as params in the route
  const token = req.params.token;

  try {
    // Call the DriverService to activate the driver with
    // with the provided token
    await AdminService.activate(token);
    // Send a success message if driver was successfully activated
    res.send({ message: en.account_activation_success });
  } catch (err) {
    // Return an error message if activation failed
    /**
     * Errors that could occur include
     * 1. Invalid Token
     */
    next(err);
  }
});

/* GET SPECIFIC ADMIN */
router.get("/api/1.0/admins/:id", async (req, res, next) => {
  // Check whether the request has an authenticated user
  const authenticatedUser = req.authenticatedUser;

  // If authenticated user does not exist or the id of that user does not match the req params id
  // we return an error body
  if (!authenticatedUser || authenticatedUser.id != req.params.id) {
    // Custom error body for Forbidden request, which means only this particular
    // user can update his details
    return next(new ForbiddenException(en.unauthorized_user_update));
  }

  try {
    const admin = await AdminService.getAdmin(req.params.id);
    res.send(admin);
  } catch (err) {
    next(err);
  }
  // res.status(404).send();
});

/* ADMIN UPDATE ROUTE */
router.put(
  "/api/1.0/admins/:id",
  check("username")
    .notEmpty()
    .withMessage(en.username_null)
    .bail()
    .isLength({ min: 4, max: 32 })
    .withMessage(en.username_size),
  check("image").custom(async (imageAsBase64String) => {
    // If no image is passed in update
    // request then return true as success
    if (!imageAsBase64String) {
      return true;
    }
    // Get buffer of the image passed
    const buffer = Buffer.from(imageAsBase64String, "base64");
    if (!FileService.isLessThan2MB(buffer)) {
      // Image size must not be greater than 2MB
      // We return appropriate error body if image is greater
      throw new Error(en.profile_image_size);
    }
    // Check for file type
    const supportedType = await FileService.isSupportedFileType(buffer);
    if (!supportedType) {
      // Throw an error for a file which is not a supported in the system
      throw new Error(en.unsupported_image_file);
    }
    return true;
  }),
  async (req, res, next) => {
    // Check whether the request has an authenticated user
    const authenticatedUser = req.authenticatedUser;

    // If authenticated user does not exist or the id of that user does not match the req params id
    // we return an error body
    if (!authenticatedUser || authenticatedUser.id != req.params.id) {
      // Custom error body for Forbidden request, which means only this particular
      // user can update his details
      return next(new ForbiddenException(en.unauthorized_user_update));
    }
    // Get errors as a result of username validation
    const errors = validationResult(req);
    // If Errors occur as a result of validation
    // return an appropriate error message to frontend
    if (!errors.isEmpty()) {
      // Error handler for validation issues
      return next(new ValidationException(errors.array()));
    }
    // If Admin is authenticated properly
    // Update his details using the request body
    const user = await AdminService.updateUser(req.params.id, req.body);
    return res.send(user);
  }
);

module.exports = router;
