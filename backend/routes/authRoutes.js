const express = require("express");
const router = express.Router();
const {
  register,
  login,
  validateEmailAndSendOTP,
  validateOTP,
  resetPassword,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/validateEmail", validateEmailAndSendOTP);
router.post("/validateOTP", validateOTP);
router.post("/resetPassword", resetPassword);

module.exports = router;
