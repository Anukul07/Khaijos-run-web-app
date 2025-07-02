const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startLocation: {
      type: {
        lat: Number,
        lng: Number,
      },
      required: true,
    },
    endLocation: {
      type: {
        lat: Number,
        lng: Number,
      },
      required: true,
    },
    distanceKm: { type: Number, required: true }, // calculated using Haversine formula
    pace: { type: String }, // e.g., "6:00 min/km"
    scheduledDateTime: { type: Date, required: true },
    totalSlots: { type: Number, default: 20 },
    joinedRunners: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    status: {
      type: String,
      enum: ["upcoming", "completed"],
      default: "upcoming",
    },
    enabled: {
      type: Boolean,
      default: true,
    },
    routePath: {
      type: [[Number]],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Session", sessionSchema);
