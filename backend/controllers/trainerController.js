const Trainer = require("../models/Trainer");

exports.getTrainerProfile = async (req, res) => {
  try {
    const trainer = await Trainer.findOne({ userId: req.user.id }).populate(
      "userId",
      "name email"
    );
    if (!trainer) return res.status(404).json({ message: "Trainer not found" });
    res.json(trainer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createOrUpdateTrainer = async (req, res) => {
  try {
    const data = {
      userId: req.user.id,
      photo: req.body.photo,
      totalSessions: req.body.totalSessions || 0,
      totalRunners: req.body.totalRunners || 0,
      totalAccolades: req.body.totalAccolades || 0,
      personalBest: req.body.personalBest || "",
    };

    const existing = await Trainer.findOne({ userId: req.user.id });
    const trainer = existing
      ? await Trainer.findOneAndUpdate({ userId: req.user.id }, data, {
          new: true,
        })
      : await Trainer.create(data);

    res.status(200).json(trainer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
