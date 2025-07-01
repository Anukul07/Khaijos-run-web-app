const Trainer = require("../models/Trainer");

exports.getTrainerProfile = async (req, res) => {
  try {
    const trainer = await Trainer.findOne({ userId: req.user.id }).populate(
      "userId",
      "name email photo"
    );
    if (!trainer) return res.status(404).json({ message: "Trainer not found" });
    res.json(trainer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createOrUpdateTrainer = async (req, res) => {
  try {
    const userId = req.user.id;

    // Optionally update user photo
    if (req.body.photo) {
      await User.findByIdAndUpdate(userId, { photo: req.body.photo });
    }

    const data = {
      userId,
      totalSessions: req.body.totalSessions || 0,
      totalAccolades: req.body.totalAccolades || 0,
      personalBest: req.body.personalBest || "",
    };

    const existing = await Trainer.findOne({ userId });
    const trainer = existing
      ? await Trainer.findOneAndUpdate({ userId }, data, { new: true })
      : await Trainer.create(data);

    res.status(200).json(trainer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
