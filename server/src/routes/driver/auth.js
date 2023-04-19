const express = require("express");
const register = require("../../controllers/driver/auth");

const router = express.Router();

router.post("/api/1.0/drivers/auth", register);

module.exports = router;
