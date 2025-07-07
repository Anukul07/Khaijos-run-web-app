const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const generateOTP = require("../utils/optGenerator");
const sendOTPEmail = require("../utils/emailSender");

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Register
exports.register = async (req, res) => {
  const { name, email, password, role, phone } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
    });
    res.status(201).json({ message: "Account created successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    res.status(200).json({ token: generateToken(user), user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.validateEmailAndSendOTP = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "No account found with this email." });
    }

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000;
    await user.save();

    await sendOTPEmail(email, otp);

    res.status(200).json({
      message: "Email is valid. OTP has been sent.",
      otpSent: true,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Error while sending OTP email." });
  }
};

exports.validateOTP = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required." });
  }

  try {
    const user = await User.findOne({
      email,
      otp,
      otpExpiry: { $gt: Date.now() }, // OTP still valid
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }

    res.status(200).json({
      message: "OTP is valid. You may now reset your password.",
      otpValidated: true,
    });
  } catch (error) {
    console.error("OTP validation error:", error.message);
    res.status(500).json({ message: "Server error during OTP validation." });
  }
};

exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res
      .status(400)
      .json({ message: "Email and new password are required." });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "No account found with this email." });
    }

    // Clear old OTP to prevent reuse
    user.otp = undefined;
    user.otpExpiry = undefined;

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();

    res.status(200).json({ message: "Password reset successfully." });
  } catch (error) {
    console.error("Reset password error:", error.message);
    res.status(500).json({ message: "Server error while resetting password." });
  }
};
