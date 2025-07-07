const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    productType: { type: String, required: true },
    productDescription: { type: String, required: true },
    sizes: [{ type: String }], // e.g., ["S", "M", "L"]
    availableSizes: [{ type: String }], // e.g., ["M", "L"]
    price: { type: Number, required: true },
    category: {
      type: String,
      enum: ["accessories", "clothing", "shoes"],
      required: true,
    },
    productImage: { type: String }, // store file name like "shoe1.jpg"
    gender: {
      type: String,
      enum: ["men", "women"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
