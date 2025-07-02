const Stats = require("../models/Stats");
const User = require("../models/User");

exports.getUserStats = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const stats = await Stats.findOne({ user: userId }).populate(
      "user",
      "name email photo"
    );

    if (!stats) {
      return res.status(404).json({ message: "Stats not found for user" });
    }

    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
