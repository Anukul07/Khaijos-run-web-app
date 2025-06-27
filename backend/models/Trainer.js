const mongoose = require("mongoose");

const trainerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    photo: { type: String }, // image URL
    totalSessions: { type: Number, default: 0 },
    totalRunners: { type: Number, default: 0 },
    totalAccolades: { type: Number, default: 0 },
    personalBest: { type: String }, // e.g., "5km in 22m"
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trainer", trainerSchema);
