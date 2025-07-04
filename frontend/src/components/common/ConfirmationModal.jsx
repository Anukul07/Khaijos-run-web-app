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
    <div className="modal-overlay">
      <div className="modal-content">
        {!success ? (
          <>
            <p className="modal-text">{message}</p>
            <div className="modal-buttons">
              <button className="yes-button" onClick={onConfirm}>
                Yes
              </button>
              <button className="no-button" onClick={onCancel}>
                No
              </button>
            </div>
          </>
        ) : (
          <div className="modal-text success-message">
            {successMessage}
            {icon && <span className="run-icon">{icon}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
