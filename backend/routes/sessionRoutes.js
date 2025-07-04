const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  createSession,
  getJoinedSessions,
  getAvailableSessions,
  joinSession,
  cancelSession,
} = require("../controllers/sessionController");

router.post("/", createSession);
router.post("/joined", getJoinedSessions);
router.post("/available", getAvailableSessions);
router.post("/join/:id", joinSession);
router.post("/cancel/:id", cancelSession);
module.exports = router;
