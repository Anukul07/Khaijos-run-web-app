import { useState, useEffect } from "react";
import Footer from "../components/common/Footer";
import Navigation from "../components/common/Navigation";
import "../styles/shop.css";
import { FaFilter } from "react-icons/fa";
import axios from "axios";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../components/common/CartContext";

export default function Shop() {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [activeCategory, setActiveCategory] = useState("Shoes");
  const [products, setProducts] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [modalSelectedSize, setModalSelectedSize] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(1);
  const { addToCart } = useCart();

  const filters = ["Men", "Women", "Size 34-38", "Size 39-41", "Size 42-43"];

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
    setShowFilters(false);
  };
  const handleSizeSelect = (productId, size) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [productId]: prev[productId] === size ? null : size,
    }));
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/products/getAll"
        );
        setProducts(res.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };
    fetchProducts();
  }, []);

  const openModal = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setModalSelectedSize(null);
    setCurrentImageIndex(1);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };
  const filteredProducts = products.filter((product) => {
    // Match category
    if (product.category.toLowerCase() !== activeCategory.toLowerCase()) {
      return false;
    }

    if (selectedFilter === "Men") {
      if (!product.productType.includes("Men's")) return false;
    } else if (selectedFilter === "Women") {
      if (!product.productType.includes("Women's")) return false;
    }

    const sizeMap = {
      "Size 34-38": ["34", "35", "36", "37", "38"],
      "Size 39-41": ["39", "40", "41"],
      "Size 42-43": ["42", "43"],
    };

    if (sizeMap[selectedFilter]) {
      const allowedSizes = sizeMap[selectedFilter];
      const hasSize = product.availableSizes.some((size) =>
        allowedSizes.includes(size)
      );
      if (!hasSize) return false;
    }

    return true;
  });

  return (
    <div className="shop-component">
      <Navigation />
      <div className="shop-container">
        <div className="categories-section">
          <div className="categories-content">
            <h2>Categories</h2>
            <div className="categories-selection-box">
              <div className="filter-row">
                <button
                  className="filter-button"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <FaFilter />
                  <span>{selectedFilter || "Filter"}</span>
                </button>
                {showFilters && (
                  <div className="filter-options">
                    {filters.map((filter) => (
                      <div
                        key={filter}
                        className="filter-option"
                        onClick={() => handleFilterClick(filter)}
                      >
                        {filter}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="category-buttons">
                {["Shoes", "Clothing", "Accessories"].map((cat) => (
                  <button
                    key={cat}
                    className={`category-button ${
                      activeCategory === cat ? "active-tab" : ""
                    }`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="product-section">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product._id} className="product-card">
                <div
                  className="product-image-container"
                  onClick={() => openModal(product)}
                >
                  <img
                    src={`/shoes/${product.productImage}`}
                    alt={product.productName}
                    className="product-image"
                  />
                </div>
                <div className="product-info">
                  <div className="product-info-top">
                    <div className="product-details-column">
                      <p className="product-name">{product.productName}</p>
                      <p className="product-type">{product.productType}</p>
                      <p className="product-price">Rs. {product.price}</p>
                    </div>
                    <div className="product-sizes-column">
                      <p className="sizes-title">Sizes</p>
                      <div className="sizes-boxes">
                        {product.sizes.map((size) => {
                          const isAvailable =
                            product.availableSizes.includes(size);
                          const isSelected =
                            selectedSizes[product._id] === size;

                          return (
                            <div
                              key={size}
                              className={`size-box ${
                                isAvailable ? "available" : "unavailable"
                              } ${isSelected ? "selected" : ""}`}
                              onClick={() =>
                                isAvailable &&
                                handleSizeSelect(product._id, size)
                              }
                            >
                              {size}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="product-info-bottom">
                    <button
                      className="add-to-cart-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!selectedSizes[product._id]) {
                          alert("Please select a size first!");
                          return;
                        }
                        addToCart({
                          productId: product._id,
                          productName: product.productName,
                          productType: product.productType,
                          productImage: product.productImage,
                          price: product.price,
                          size: selectedSizes[product._id],
                          quantity: 1,
                        });
                      }}
                    >
                      <FaShoppingCart className="cart-icon" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-products-message">
              {activeCategory === "Clothing" &&
                "We do not have any clothing items yet."}
              {activeCategory === "Accessories" &&
                "We do not have any accessories yet."}
              {activeCategory === "Shoes" &&
                "We do not have any shoes available right now."}
            </div>
          )}
        </div>
        {selectedProduct && (
          <div className="product-modal-overlay">
            <div className="product-modal">
              <button className="modal-close-btn" onClick={closeModal}>
                ✕
              </button>
              <div className="product-modal-image">
                <div
                  className="image-arrow left-arrow"
                  onClick={() =>
                    setCurrentImageIndex((prev) => (prev === 1 ? 4 : prev - 1))
                  }
                >
                  ❮
                </div>

                <img
                  src={`/shoes/${selectedProduct.productImage.replace(
                    /-\d+\.png$/,
                    `-${currentImageIndex}.png`
                  )}`}
                  alt={selectedProduct.productName}
                />

                <div
                  className="image-arrow right-arrow"
                  onClick={() =>
                    setCurrentImageIndex((prev) => (prev === 4 ? 1 : prev + 1))
                  }
                >
                  ❯
                </div>
              </div>

              <div className="product-modal-info">
                <h2>{selectedProduct.productName}</h2>
                <p className="modal-type">{selectedProduct.productType}</p>
                <p className="modal-price">Rs. {selectedProduct.price}</p>
                <p className="modal-description">
                  {selectedProduct.productDescription}
                </p>
                <div className="modal-quantity-size-row">
                  <div className="modal-sizes">
                    <p className="sizes-title">Sizes</p>
                    <div className="sizes-boxes">
                      {selectedProduct.sizes.map((size) => {
                        const isAvailable =
                          selectedProduct.availableSizes.includes(size);
                        const isSelected = modalSelectedSize === size;

                        return (
                          <div
                            key={size}
                            className={`size-box ${
                              isAvailable ? "available" : "unavailable"
                            } ${isSelected ? "selected" : ""}`}
                            onClick={() =>
                              isAvailable && setModalSelectedSize(size)
                            }
                          >
                            {size}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="quantity-wrapper">
                    <label htmlFor="quantity" className="quantity-label">
                      Quantity:
                    </label>
                    <input
                      type="text"
                      id="quantity"
                      value={quantity}
                      onChange={(e) => {
                        const value = e.target.value.trim();

                        // Only allow numeric input
                        if (!/^\d*$/.test(value)) return;

                        const num = Number(value);

                        // Allow only 1 to 10, or empty string (for controlled input)
                        if (value === "" || (num >= 1 && num <= 10)) {
                          setQuantity(value);
                        }
                      }}
                      onBlur={() => {
                        // Enforce min of 1 if input left empty or zero
                        if (quantity === "" || Number(quantity) < 1) {
                          setQuantity(1);
                        }
                      }}
                      className="quantity-input"
                      inputMode="numeric"
                      pattern="[0-9]*"
                    />
                  </div>
                </div>

                <div className="modal-cart-btn-wrapper">
                  <button
                    className="add-to-cart-btn modal-cart-btn"
                    onClick={() => {
                      if (!modalSelectedSize) {
                        alert("Please select a size.");
                        return;
                      }
                      addToCart({
                        productId: selectedProduct._id,
                        productName: selectedProduct.productName,
                        productType: selectedProduct.productType,
                        productImage: selectedProduct.productImage,
                        price: selectedProduct.price,
                        size: modalSelectedSize,
                        quantity,
                      });
                      closeModal();
                    }}
                  >
                    <FaShoppingCart className="cart-icon" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
