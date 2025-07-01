const Session = require("../models/Session");
const User = require("../models/User");

// Haversine formula
const calculateDistance = (start, end) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Radius of the Earth in km
  const dLat = toRad(end.lat - start.lat);
  const dLng = toRad(end.lng - start.lng);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(start.lat)) *
      Math.cos(toRad(end.lat)) *
      Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

exports.createSession = async (req, res) => {
  try {
    const {
      userId,
      startLocation,
      endLocation,
      scheduledDateTime,
      pace,
      totalSlots,
    } = req.body;

    const distanceKm = calculateDistance(startLocation, endLocation);

    const session = await Session.create({
      creator: userId,
      startLocation,
      endLocation,
      scheduledDateTime,
      pace,
      totalSlots,
      distanceKm,
    });

    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getJoinedSessions = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const sessions = await Session.find({
      joinedRunners: userId,
    })
      .populate("creator", "name role")
      .sort({ scheduledDateTime: 1 });

    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAvailableSessions = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const sessions = await Session.find({
      joinedRunners: { $ne: userId },
      enabled: true,
      status: "upcoming",
      scheduledDateTime: { $gte: new Date() },
    })
      .populate("creator", "name role")
      .sort({ scheduledDateTime: 1 });

    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.joinSession = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const session = await Session.findById(req.params.id);

    if (!session || !session.enabled) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (session.joinedRunners.includes(userId)) {
      return res.status(400).json({ message: "Already joined" });
    }

    if (session.joinedRunners.length >= session.totalSlots) {
      return res.status(400).json({ message: "Slots full" });
    }

    session.joinedRunners.push(userId);
    await session.save();

    res.json({ message: "Joined successfully", session });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
