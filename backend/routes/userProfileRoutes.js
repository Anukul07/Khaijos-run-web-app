const express = require("express");
const router = express.Router();
const {
  updateUserProfile,
  changeUserPassword,
} = require("../controllers/userProfileController");
const upload = require("./../middlewares/uploadProfile");

router.post("/update", upload.single("photo"), updateUserProfile);
router.post("/change-password", changeUserPassword);

module.exports = router;
