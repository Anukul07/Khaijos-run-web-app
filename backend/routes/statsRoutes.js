const express = require("express");
const router = express.Router();
const { getUserStats } = require("../controllers/statsController");

// POST route to get stats for a user by userId from req.body
router.post("/user", getUserStats);

module.exports = router;
