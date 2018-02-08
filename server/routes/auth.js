const express = require("express");
const jwt = require("jsonwebtoken");

const database = require("../database");
const {
  login,
  register,
  verifyRegistration,
  resetPassword,
  forgotPassword
} = require("../controllers/auth");

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/:userId/forgotPassword", forgotPassword);
router.get("/:userId/verify", verifyRegistration);

module.exports = router;
