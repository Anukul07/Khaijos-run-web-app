const Trainer = require("../models/Trainer");

exports.getTrainerProfile = async (req, res) => {
  try {
    const trainer = await Trainer.findOne({ userId: req.user.id })
      .populate("userId", "name email photo")
      .populate("statsId");

    if (!trainer) return res.status(404).json({ message: "Trainer not found" });

    res.json(trainer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createOrUpdateTrainer = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.role !== "trainer") {
      user.role = "trainer";
      await user.save();
    }

    let stats = await Stats.findOne({ user: userId });
    if (!stats) {
      stats = await Stats.create({ user: userId });
    }

    const trainerData = {
      userId,
      statsId: stats._id,
      personalBest: req.body.personalBest || "",
    };

    let trainer = await Trainer.findOneAndUpdate({ userId }, trainerData, {
      new: true,
      upsert: true,
    });

    res.status(200).json({
      message: "Trainer profile set up successfully",
      trainer,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTrainerStats = async (req, res) => {
  try {
    const { userId } = req.body;

    const trainer = await Trainer.findOne({ userId });
    if (!trainer) {
      return res.status(404).json({ message: "Trainer profile not found" });
    }

    if (req.body.personalBest) {
      trainer.personalBest = req.body.personalBest;
      await trainer.save();
    }

    const stats = await Stats.findById(trainer.statsId);
    if (!stats) {
      return res.status(404).json({ message: "Stats not found" });
    }

    const allowedUpdates = [
      "totalSessionsCompleted",
      "totalAccolades",
      "averagePace",
      "totalDistanceRan",
    ];

    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        stats[field] = req.body[field];
      }
    });

    await stats.save();

    res.status(200).json({
      message: "Trainer stats updated successfully",
      trainer,
      stats,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
