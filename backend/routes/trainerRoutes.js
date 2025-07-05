const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  getTrainerProfile,
  createOrUpdateTrainer,
  updateTrainerStats,
} = require("../controllers/trainerController");

router.get("/me", getTrainerProfile);
router.post("/setup", createOrUpdateTrainer);
router.post("/updateStats", updateTrainerStats);

module.exports = router;
