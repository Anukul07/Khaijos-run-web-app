const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  getTrainerProfile,
  createOrUpdateTrainer,
  updateTrainerStats,
  getAllTrainers,
} = require("../controllers/trainerController");

router.get("/me", getTrainerProfile);
router.post("/setup", createOrUpdateTrainer);
router.post("/updateStats", updateTrainerStats);
router.get("/all", getAllTrainers);

module.exports = router;
