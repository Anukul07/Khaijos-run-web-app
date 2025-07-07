import React, { useEffect, useState } from "react";
import { useCart } from "../components/common/CartContext";
import Navigation from "./common/Navigation";
import Footer from "./common/Footer";
import "../styles/cart.css";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoIosContact } from "react-icons/io";
import { MdLocationPin } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaMoneyBillAlt } from "react-icons/fa";
import khaltiLogo from "../assets/Cart/khalti-logo.png";
import OrderConfirmationModal from "./common/OrderConfirmationModal";
import { FaCheckCircle } from "react-icons/fa";

export default function Cart() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const userId = user._id;
  const phone = user.phone || "";
  const email = user.email || "";
  const name = user.name || "";
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/deliveryAddress/get",
          { userId }
        );
        setDeliveryAddress(res.data);
      } catch (error) {
        if (
          error.response &&
          error.response.status === 404 &&
          error.response.data.message ===
            "No delivery address found for this user"
        ) {
          setDeliveryAddress(null); // No address set
        } else {
          console.error("Error fetching delivery address:", error);
        }
      }
    };

    if (userId) {
      fetchAddress();
    }
  }, [userId]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // null means "Buy All"
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const handleOrderNowClick = () => {
    if (paymentMethod === "cash") {
      setShowConfirmation(true);
    } else if (paymentMethod === "khalti") {
      // Placeholder for future modal
      alert("Khalti payment flow coming soon!");
    }
  };
  const handleConfirmOrder = async () => {
    try {
      const orderData = selectedItem
        ? {
            userId,
            productId: selectedItem.productId,
            deliveryAddressId: deliveryAddress._id,
            quantity: selectedItem.quantity,
            paymentType: paymentMethod,
            totalPrice: selectedItem.price * selectedItem.quantity,
          }
        : cartItems.map((item) => ({
            userId,
            productId: item.productId,
            deliveryAddressId: deliveryAddress._id,
            quantity: item.quantity,
            paymentType: paymentMethod,
            totalPrice: item.price * item.quantity,
          }));

      if (Array.isArray(orderData)) {
        for (const order of orderData) {
          await axios.post("http://localhost:5000/api/orders/create", order);
        }
      } else {
        await axios.post("http://localhost:5000/api/orders/create", orderData);
      }

      setOrderSuccess(true);

      setTimeout(() => {
        clearCart();
        setShowConfirmation(false);
        setShowModal(false);
        setOrderSuccess(false);
      }, 2500);
    } catch (error) {
      console.error("Order creation failed:", error);
      alert("Order failed. Try again.");
    }
  };
  return (
    <div className="cart-component">
      <Navigation />
      <div className="cart-section">
        <div className="cart-items-box">
          <div className="cart-product-cards">
            <h2>Items</h2>
            <div className="cart-items">
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <div key={index} className="cart-item-card">
                    <div className="cart-item-left">
                      <img
                        src={`/shoes/${item.productImage}`}
                        alt={item.productName}
                        className="cart-item-image"
                      />
                    </div>

                    <div className="cart-item-details">
                      <p className="cart-item-name">{item.productName}</p>
                      <p className="cart-item-type">{item.productType}</p>
                      <p className="cart-item-price">Rs. {item.price}</p>
                    </div>

                    <div className="cart-item-quantity-size">
                      <p className="cart-item-size">Size: {item.size}</p>
                      <p className="cart-item-quantity">Qty: {item.quantity}</p>
                    </div>

                    <div className="cart-item-actions">
                      <button
                        className="cart-delete-btn"
                        onClick={() =>
                          removeFromCart(item.productId, item.size)
                        }
                      >
                        <FaTrash />
                      </button>
                      <button
                        className="cart-buy-link"
                        onClick={() => {
                          setSelectedItem(item);
                          setShowModal(true);
                        }}
                      >
                        Buy
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ color: "white" }}>Your cart is empty.</p>
              )}
            </div>
          </div>
          <div className="buy-all-button">
            <p>
              Total ({totalItems} item{totalItems !== 1 ? "s" : ""}): Rs.{" "}
              {totalAmount}
            </p>
            <button
              className="buy-all-link"
              onClick={() => {
                setSelectedItem(null);
                setShowModal(true);
              }}
            >
              Buy all items
            </button>
          </div>
        </div>
        <div className="order-delivery-section">
          <div className="delivery-address-section">
            <h2>Delivery Details</h2>
            <div className="delivery-details">
              {deliveryAddress ? (
                <>
                  <div className="delivery-row">
                    <IoIosContact className="delivery-icon" />
                    <span>{name}</span>
                  </div>
                  <div className="delivery-row">
                    <FaPhoneAlt className="delivery-icon" />
                    <span>{phone}</span>
                  </div>
                  <div className="delivery-row">
                    <MdLocationPin className="delivery-icon" />
                    <span>
                      {`${deliveryAddress.addressLine1}` +
                        (deliveryAddress.addressLine2
                          ? `, ${deliveryAddress.addressLine2}`
                          : "") +
                        `, ${deliveryAddress.city}, ${deliveryAddress.province}`}
                    </span>
                  </div>
                  <div className="delivery-row">
                    <MdEmail className="delivery-icon" />
                    <span>{email}</span>
                  </div>
                  <button
                    className="change-details-btn"
                    onClick={() => navigate("/profile")}
                  >
                    Change Details
                  </button>
                </>
              ) : (
                <div className="no-address-placeholder">
                  <p className="update-warning">
                    Please update your delivery information.
                  </p>
                  <button
                    className="update-details-link"
                    onClick={() => navigate("/profile")}
                  >
                    Update Details
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="payment-method-section">
            <h2>Payment Method</h2>
            <div className="payment-options">
              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={paymentMethod === "cash"}
                  onChange={() => setPaymentMethod("cash")}
                />
                <div className="payment-content">
                  <FaMoneyBillAlt className="payment-icon" />
                  <span>Cash on Delivery</span>
                </div>
              </label>

              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="khalti"
                  checked={paymentMethod === "khalti"}
                  onChange={() => setPaymentMethod("khalti")}
                />
                <div className="payment-content khalti-option">
                  <img src={khaltiLogo} alt="Khalti" />
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {showModal && (
        <div className="order-modal-overlay">
          <div className="order-modal-box">
            <button
              className="modal-close-btn"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <h2 className="modal-title">Order Summary</h2>

            <div className="modal-content">
              {/* LEFT: Order Items & Summary */}
              <div className="modal-left">
                {selectedItem ? (
                  <div className="modal-item">
                    <div className="modal-item-left">
                      <img
                        src={`/shoes/${selectedItem.productImage}`}
                        alt={selectedItem.productName}
                        className="modal-item-image"
                      />
                    </div>

                    <div className="modal-item-details">
                      <p className="modal-item-name">
                        {selectedItem.productName}
                      </p>
                      <p className="modal-item-type">
                        {selectedItem.productType}
                      </p>
                      <p>Size: {selectedItem.size}</p>
                      <p>Qty: {selectedItem.quantity}</p>
                    </div>

                    <div className="modal-item-price">
                      <p>Rs. {selectedItem.price * selectedItem.quantity}</p>
                    </div>
                  </div>
                ) : (
                  <>
                    {cartItems.map((item, i) => (
                      <div className="modal-item" key={i}>
                        <div className="modal-item-left">
                          <img
                            src={`/shoes/${item.productImage}`}
                            alt={item.productName}
                            className="modal-item-image"
                          />
                        </div>

                        <div className="modal-item-details">
                          <p className="modal-item-name">{item.productName}</p>
                          <p className="modal-item-type">{item.productType}</p>
                          <p>Size: {item.size}</p>
                          <p>Qty: {item.quantity}</p>
                        </div>

                        <div className="modal-item-price">
                          <p>Rs. {item.price * item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </>
                )}

                {/* Always visible regardless of selectedItem */}
                <div className="modal-extra">
                  <p>Delivery Charge: NPR 0</p>
                  <p>
                    Total: NPR{" "}
                    {selectedItem
                      ? selectedItem.price * selectedItem.quantity
                      : totalAmount}
                  </p>
                  <p>
                    Payment Method:{" "}
                    {paymentMethod === "khalti" ? "Khalti" : "Cash on Delivery"}
                  </p>
                </div>

                <button className="order-now-btn" onClick={handleOrderNowClick}>
                  Order Now
                </button>
              </div>

              {/* RIGHT: Delivery Details */}
              <div className="modal-delivery-info">
                <h3>Delivering to,</h3>

                <p>
                  <IoIosContact className="delivery-icon-overlay" />
                  {name}
                </p>

                <p>
                  <FaPhoneAlt className="delivery-icon-overlay" />
                  {phone}
                </p>

                <p>
                  <MdLocationPin className="delivery-icon-overlay" />
                  {`${deliveryAddress?.addressLine1}` +
                    (deliveryAddress?.addressLine2
                      ? `, ${deliveryAddress.addressLine2}`
                      : "") +
                    `, ${deliveryAddress?.city}, ${deliveryAddress?.province}`}
                </p>

                <p>
                  <MdEmail className="delivery-icon-overlay" />
                  {email}
                </p>
              </div>
            </div>
          </div>
          <OrderConfirmationModal
            show={showConfirmation}
            onConfirm={handleConfirmOrder}
            onCancel={() => setShowConfirmation(false)}
            message="Are you sure you want to place this order?"
            success={orderSuccess}
            successMessage="Order placed successfully!"
            icon={<FaCheckCircle style={{ color: "#2e7d32" }} />}
          />
        </div>
      )}
    </div>
  );
}
