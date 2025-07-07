import { useState } from "react";
import axios from "axios";
import "./passwordReset.css";

const PasswordReset = ({ onResetComplete, goToLogin }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailSubmit = async () => {
    setLoading(true);
    setFeedback("");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/validateEmail",
        { email }
      );
      setFeedback(res.data.message);
      setStep(2);
    } catch (err) {
      setFeedback(err.response?.data?.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    setLoading(true);
    setFeedback("");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/validateOTP",
        { email, otp }
      );
      setFeedback(res.data.message);
      setStep(3);
    } catch (err) {
      setFeedback(err.response?.data?.message || "Invalid or expired OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setFeedback("Passwords do not match.");
      return;
    }

    setLoading(true);
    setFeedback("");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/resetPassword",
        {
          email,
          newPassword,
        }
      );
      setFeedback(res.data.message);
      setTimeout(() => {
        onResetComplete(); // triggers login modal
      }, 2500);
    } catch (err) {
      setFeedback(err.response?.data?.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-box">
      <h2>Reset Password</h2>
      <p>Let’s help you recover your account</p>
      <p className="reset-auth-switch">
        Remembered your password?{" "}
        <a onClick={goToLogin} style={{ cursor: "pointer" }}>
          Back to login
        </a>
      </p>

      {feedback && <p id="reset-feedback-message">{feedback}</p>}

      {step === 1 && (
        <>
          <label className="reset-label">Enter your email</label>
          <input
            type="email"
            className="reset-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="reset-text-button"
            onClick={handleEmailSubmit}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <label className="reset-label">
            Enter the OTP sent to your email
          </label>
          <input
            type="text"
            className="reset-input"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button
            className="reset-text-button"
            onClick={handleOtpSubmit}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <input
            type="password"
            placeholder="New password"
            className="reset-input"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm password"
            className="reset-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            className="reset-final-button"
            onClick={handleResetPassword}
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </>
      )}
    </div>
  );
};

export default PasswordReset;
