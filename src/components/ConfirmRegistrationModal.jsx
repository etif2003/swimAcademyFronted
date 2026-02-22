import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ConfirmRegistrationModal.css";

const ConfirmRegistrationModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoggedIn,
}) => {
  const [status, setStatus] = useState("idle"); 
  // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // איפוס מצב בכל פתיחה מחדש
  useEffect(() => {
    if (isOpen) {
      setStatus("idle");
      setErrorMessage("");
    }
  }, [isOpen]);

  // סגירה עם ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleConfirmClick = async () => {
    try {
      setStatus("loading");
      await onConfirm();
      setStatus("success");
    } catch (err) {
      setErrorMessage(err.message);
      setStatus("error");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-box ${
          status === "success"
            ? "modal-success"
            : status === "error"
            ? "modal-error"
            : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* משתמש לא מחובר */}
        {!isLoggedIn && (
          <>
            <h3>נדרש חיבור</h3>
            <p>כדי להירשם לקורס יש להתחבר למערכת תחילה.</p>

            <div className="confirm-modal-buttons">
              <button
                className="confirm-modal-btn"
                onClick={() => navigate("/auth")}
              >
                מעבר להתחברות
              </button>
              <button className="cancel-modal-btn" onClick={onClose}>
                סגור
              </button>
            </div>
          </>
        )}

        {/* משתמש מחובר - מצב רגיל */}
        {isLoggedIn && status === "idle" && (
          <>
            <h3>אישור הרשמה</h3>
            <p>האם אתה בטוח שברצונך להירשם לקורס?</p>
            <p>
              לאחר אישור סופי מדריך הקורס ייצור איתך קשר לקבלת מידע נוסף ולהמשך
              תהליך התשלום
            </p>

            <div className="confirm-modal-buttons">
              <button
                className="confirm-modal-btn"
                onClick={handleConfirmClick}
              >
                אישור
              </button>
              <button className="cancel-modal-btn" onClick={onClose}>
                ביטול
              </button>
            </div>
          </>
        )}

        {/* טעינה */}
        {isLoggedIn && status === "loading" && (
          <>
            <h3>מבצע הרשמה...</h3>
            <div className="spinner"></div>
            <p>אנא המתן רגע</p>
          </>
        )}

        {/* הצלחה */}
        {isLoggedIn && status === "success" && (
          <>
            <h3>נרשמת בהצלחה 🎉</h3>
            <p>
              המדריך ייצור איתך קשר בקרוב לקבלת מידע נוסף ולהמשך תהליך התשלום.
            </p>

            <div className="confirm-modal-buttons">
              <button className="confirm-modal-btn" onClick={onClose}>
                סגור
              </button>
            </div>
          </>
        )}

        {/* שגיאה */}
        {isLoggedIn && status === "error" && (
          <>
            <h3>אירעה שגיאה</h3>
            <p>{errorMessage}</p>

            <div className="confirm-modal-buttons">
              <button
                className="confirm-modal-btn"
                onClick={() => setStatus("idle")}
              >
                נסה שוב
              </button>
              <button className="cancel-modal-btn" onClick={onClose}>
                סגור
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ConfirmRegistrationModal;
