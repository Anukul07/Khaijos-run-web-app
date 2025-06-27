const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  getTrainerProfile,
  createOrUpdateTrainer,
} = require("../controllers/trainerController");

router.get("/me", protect, getTrainerProfile);
router.post("/setup", protect, createOrUpdateTrainer);

module.exports = router;
