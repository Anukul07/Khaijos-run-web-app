import "../../styles/orderConfirmationModal.css";

export default function OrderConfirmationModal({
  show,
  onConfirm,
  onCancel,
  message,
  success,
  successMessage,
  icon,
}) {
  if (!show) return null;

  return (
    <div className="order-confirmation-overlay">
      <div className="order-confirmation-box">
        {!success ? (
          <>
            <p className="order-confirmation-message">{message}</p>
            <div className="order-confirmation-buttons">
              <button className="order-confirmation-yes" onClick={onConfirm}>
                Yes
              </button>
              <button className="order-confirmation-no" onClick={onCancel}>
                No
              </button>
            </div>
          </>
        ) : (
          <div className="order-confirmation-success">
            {successMessage}
            {icon && <span className="order-confirmation-icon">{icon}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
