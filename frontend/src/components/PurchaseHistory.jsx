import React, { useEffect, useState } from "react";
import Navigation from "./common/Navigation";
import Footer from "./common/Footer";
import axios from "axios";
import "../styles/purchaseHistory.css";

export default function PurchaseHistory() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filter, setFilter] = useState("date");

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/orders/getByUser",
          { userId }
        );
        setOrders(response.data);
        setFilteredOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch order history:", error);
      }
    };

    if (userId) fetchOrders();
  }, [userId]);

  useEffect(() => {
    let sorted = [...orders];
    if (filter === "priceLow") {
      sorted.sort((a, b) => a.totalPrice - b.totalPrice);
    } else if (filter === "priceHigh") {
      sorted.sort((a, b) => b.totalPrice - a.totalPrice);
    } else {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    setFilteredOrders(sorted);
  }, [filter, orders]);

  return (
    <div className="filter-container-wrapper">
      <Navigation />
      <div className="filter-container-main">
        <div className="filter-container-bar">
          <label className="filter-container-label">Filter:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-container-dropdown"
          >
            <option value="date">Latest Date</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
          </select>
        </div>

        {filteredOrders.length === 0 ? (
          <p className="filter-container-empty">
            Your purchase history is empty.
          </p>
        ) : (
          <div className="filter-container-list">
            {filteredOrders.map((order, idx) => (
              <div key={idx} className="filter-container-row">
                <div className="filter-container-left">
                  <img
                    src={`/shoes/${order.productId.productImage}`}
                    alt={order.productId.productName}
                    className="filter-container-thumb"
                  />
                  <div className="filter-container-info">
                    <h3>{order.productId.productName}</h3>
                    <p>Quantity: {order.quantity}</p>
                    <p>
                      Ordered on:{" "}
                      {new Date(order.createdAt).toLocaleDateString("en-GB")}
                    </p>
                  </div>
                </div>
                <div className="filter-container-price">
                  Rs. {order.totalPrice}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
