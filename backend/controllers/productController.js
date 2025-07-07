const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
  try {
    const {
      productName,
      productType,
      productDescription,
      sizes,
      availableSizes,
      price,
      category,
      productImage,
      gender, // Add gender here
    } = req.body;

    // Validation (simple check)
    if (
      !productName ||
      !productType ||
      !productDescription ||
      !price ||
      !category ||
      !gender // Validate gender too
    ) {
      return res
        .status(400)
        .json({ error: "All required fields must be provided." });
    }

    const newProduct = new Product({
      productName,
      productType,
      productDescription,
      sizes,
      availableSizes,
      price,
      category,
      productImage,
      gender, // Include gender here
    });

    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json(products);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch products", message: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch product", message: err.message });
  }
};
