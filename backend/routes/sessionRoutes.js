const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  createSession,
  getJoinedSessions,
  getAvailableSessions,
  joinSession,
} = require("../controllers/sessionController");

router.post("/", createSession);
router.post("/joined", getJoinedSessions);
router.get("/available", getAvailableSessions);
router.post("/join/:id", joinSession);

module.exports = router;
