import "../../../styles/dashboard/modal-form.css";


export default function BaseModal({
  isOpen,
  onClose,
  title,
  children,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        <div className="modal-scroll">
          <div className="modal-header">
            <h2 className="modal-title">{title}</h2>

            <button
              type="button"
              className="modal-close"
              onClick={onClose}
            >
              ✕
            </button>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
