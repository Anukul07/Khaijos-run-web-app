import React, { useState } from "react";
import "../styles/khaltiOverlay.css";
import khaltiLogo from "../assets/Cart/khalti-logo.png";
import khaijosLogo from "../assets/Landing/Logo.png";

const KhaltiOverlay = ({ onClose, amount, orderSummary = [], onPayNow }) => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePayment = async () => {
    setProcessing(true);

    setTimeout(async () => {
      try {
        await onPayNow();

        // Step 1: Stop processing
        setProcessing(false);

        // Step 2: Small delay to allow React to unmount processing spinner
        setTimeout(() => {
          // Step 3: Show success
          setSuccess(true);

          // Step 4: After success message is visible, close the modal
          setTimeout(() => {
            setSuccess(false);
            onClose();
          }, 2000);
        }, 100); // Delay allows DOM to unmount spinner first
      } catch (error) {
        setProcessing(false);
        alert("Payment failed. Please try again.");
      }
    }, 2000);
  };

  return (
    <div className="khalti-overlay">
      {/* Powered by Khalti Header */}
      <div className="khalti-header">
        <span>Powered by</span>
        <img
          src={khaltiLogo}
          alt="Khalti Logo"
          className="khalti-powered-logo"
        />
      </div>

      {/* Payment Box */}
      <div className="khalti-payment-box">
        <button className="khalti-close-btn" onClick={onClose}>
          ✕
        </button>

        {/* Khaijos Branding */}
        <div className="khaijos-header">
          <div className="khaijos-logo-wrapper">
            <img
              src={khaijosLogo}
              alt="Khaijos Logo"
              className="khaijos-logo"
            />
          </div>
          <div className="khaijos-name">Run Club for Everyone</div>
        </div>

        {/* Order Summary */}
        <div className="bill-summary">
          <h3>Bill Summary</h3>
          <ul>
            {orderSummary.map((item, idx) => (
              <li key={idx}>
                <span>{item.name}</span>
                <span>Rs. {item.price}</span>
              </li>
            ))}
          </ul>
          <div className="total-amount">
            <strong>Total</strong>
            <strong>Rs. {amount}</strong>
          </div>
        </div>

        {/* Payment Form */}
        <h2>Pay with Khalti</h2>
        <input
          type="tel"
          placeholder="Phone Number"
          className="khalti-input"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password / MPIN"
          className="khalti-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="khalti-pay-btn" onClick={handlePayment}>
          Pay Now
        </button>
      </div>
      {processing && (
        <div className="khalti-mini-overlay">
          <div className="khalti-mini-box">
            <div className="spinner" />
            <p>Processing payment...</p>
          </div>
        </div>
      )}

      {success && (
        <div className="khalti-mini-overlay">
          <div className="khalti-mini-box">
            <div className="success-icon">✅</div>
            <p>Payment successful. Redirecting to Khaijos...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default KhaltiOverlay;
