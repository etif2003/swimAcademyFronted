import { useState } from "react";
import "../../styles/settings.css";



export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    // ולידציה בסיסית (רק ל־UI)
    if (newPassword.length < 6) {
      setError("הסיסמה החדשה חייבת להכיל לפחות 6 תווים");
      return;
    }

    setLoading(true);

    // 🔸 סימולציה של קריאה לשרת
    setTimeout(() => {
      setLoading(false);

      // תרחיש הצלחה
      setMessage("הסיסמה עודכנה בהצלחה");

      // איפוס שדות
      setCurrentPassword("");
      setNewPassword("");
    }, 1200);
  };

  return (
    <div className="settings-card">
      <h2>שינוי סיסמא</h2>

      <form onSubmit={handleSubmit}>
        <div className="password-row">
        <div className="form-group">
          <label>סיסמא נוכחית</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="הזן סיסמא נוכחית"
            required
          />
        </div>

        <div className="form-group">
          <label>סיסמא חדשה</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="הזן סיסמא חדשה"
            required
          />
        </div>
        </div>

        {error && <p className="error-text">{error}</p>}
        {message && <p className="success-text">{message}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "מעדכן..." : "עדכן סיסמא"}
        </button>
      </form>
    </div>
  );
}
