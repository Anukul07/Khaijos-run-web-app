const express = require("express");
const router = express.Router();
const {
  createOrUpdateDeliveryAddress,
  getDeliveryAddressByUser,
} = require("../controllers/deliveryAddressController");

router.post("/setup", createOrUpdateDeliveryAddress);
router.post("/get", getDeliveryAddressByUser);
module.exports = router;
