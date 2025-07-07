import "./authenticationModal.css";
import { FaCheckCircle } from "react-icons/fa";

export default function AuthenticationModal({ show, message }) {
  if (!show) return null;

  return (
    <div className="authentication-modal-overlay">
      <div className="authentication-modal-content modal-fade-in">
        <p className="authentication-modal-text success-message">
          {message}
          <span className="auth-icon">
            <FaCheckCircle />
          </span>
        </p>
      </div>
    </div>
  );
}
