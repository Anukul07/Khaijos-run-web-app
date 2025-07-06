const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.updateUserProfile = async (req, res) => {
  try {
    const { userId, phone } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update phone if provided
    if (phone) {
      user.phone = phone;
    }

    // Update photo only if a new file was uploaded
    if (req.file && req.file.filename) {
      user.photo = req.file.filename;
    }

    await user.save();

    return res.status(200).json({
      message: "User profile updated successfully.",
      user: {
        phone: user.phone,
        photo: user.photo,
      },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.changeUserPassword = async (req, res) => {
  const { userId, oldPassword, newPassword } = req.body;

  if (!userId || !oldPassword || !newPassword) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect old password." });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).json({ message: "Password changed successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
