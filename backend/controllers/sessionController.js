const Session = require("../models/Session");
const User = require("../models/User");

exports.createSession = async (req, res) => {
  try {
    const {
      userId,
      startLocation,
      endLocation,
      startAddress,
      endAddress,
      scheduledDateTime,
      pace,
      routePath,
      totalSlots,
      distanceKm,
    } = req.body;

    const session = await Session.create({
      creator: userId,
      startLocation,
      endLocation,
      startAddress,
      endAddress,
      scheduledDateTime,
      pace,
      totalSlots,
      routePath,
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
