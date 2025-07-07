const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
} = require("../controllers/productController");

router.post("/create", createProduct);
router.get("/getAll", getAllProducts);
router.post("/getById", getProductById);

module.exports = router;
