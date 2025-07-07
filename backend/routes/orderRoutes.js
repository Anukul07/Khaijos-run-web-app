const express = require("express");
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getOrdersByUser,
} = require("../controllers/orderController");

router.post("/create", createOrder);
router.get("/all", getAllOrders);
router.post("/getByUser", getOrdersByUser);

module.exports = router;
