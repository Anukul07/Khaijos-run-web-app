const express = require("express");
const router = express.Router();
const {
  createOrUpdateDeliveryAddress,
  getDeliveryAddressByUser,
  getDeliveryAddressById,
} = require("../controllers/deliveryAddressController");

router.post("/setup", createOrUpdateDeliveryAddress);
router.post("/get", getDeliveryAddressByUser);
router.post("/getById", getDeliveryAddressById);
module.exports = router;
