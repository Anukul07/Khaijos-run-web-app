const mongoose = require("mongoose");

const statsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    totalSessionsCompleted: { type: Number, default: 0 },
    totalAccolades: { type: Number, default: 0 }, // manually updated
    averagePace: { type: Number, default: 0 }, // in min/km, float like 6.2
    totalDistanceRan: { type: Number, default: 0 }, // in km

    monthlySessionCompletion: [
      {
        month: String, // format: "YYYY-MM"
        count: { type: Number, default: 0 },
      },
    ],
    monthlyDistanceRan: [
      {
        month: String, // format: "YYYY-MM"
        distance: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Stats", statsSchema);
