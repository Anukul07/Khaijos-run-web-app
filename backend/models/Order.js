const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    deliveryAddressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DeliveryAddress",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    paymentType: {
      type: String,
      enum: ["cash", "khalti"],
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    orderStatus: {
      type: String,
      enum: ["completed", "uncompleted"],
      default: "uncompleted",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
