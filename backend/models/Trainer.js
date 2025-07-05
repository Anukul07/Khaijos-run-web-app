const mongoose = require("mongoose");

const trainerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    statsId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stats",
      required: true,
      unique: true,
    },
    personalBest: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trainer", trainerSchema);
