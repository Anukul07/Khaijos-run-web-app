import "../../styles/confirmationModal.css";

export default function ConfirmationModal({
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
    <div className="confirmation-modal-overlay">
      <div className="confirmation-modal-content">
        {!success ? (
          <>
            <p className="confirmation-modal-text">{message}</p>
            <div className="confirmation-modal-buttons">
              <button className="yes-button" onClick={onConfirm}>
                Yes
              </button>
              <button className="no-button" onClick={onCancel}>
                No
              </button>
            </div>
          </>
        ) : (
          <div className="confirmation-modal-text success-message">
            {successMessage}
            {icon && <span className="run-icon">{icon}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
