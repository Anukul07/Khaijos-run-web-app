const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  try {
    const {
      userId,
      productId,
      deliveryAddressId,
      quantity,
      paymentType,
      totalPrice,
    } = req.body;

    // Basic validation
    if (
      !userId ||
      !productId ||
      !deliveryAddressId ||
      !quantity ||
      !paymentType ||
      !totalPrice
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newOrder = new Order({
      userId,
      productId,
      deliveryAddressId,
      quantity,
      paymentType,
      totalPrice,
    });

    await newOrder.save();

    res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .populate("productId", "productName productImage price")
      .populate("deliveryAddressId");

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const orders = await Order.find({ userId })
      .populate("productId", "productName productImage price")
      .populate("deliveryAddressId");

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders by user:", error);
    res.status(500).json({ message: "Server error" });
  }
};
