import { useState, useRef } from "react";
import "../../../styles/UserProfile.css";
import { Edit2 } from "lucide-react";

export default function StudentProfileCard({ student }) {
  const fileInputRef = useRef(null);

  const [imagePreview, setImagePreview] = useState(
    student.image ||
      "https://via.placeholder.com/200x200.png?text=Profile"
  );

  const [form, setForm] = useState({
    fullName: student.fullName || "",
    email: student.email || "",
    phone: student.phone || "",
  });

  const update = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  /* ===== Image Upload ===== */
  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("נא לבחור קובץ תמונה בלבד");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        {/* HEADER */}
        <div className="profile-header">
          <div className="avatar-wrapper">
            <img src={imagePreview} alt="תמונת פרופיל" />

            <button
              type="button"
              className="edit-avatar"
              onClick={openFilePicker}
              aria-label="עריכת תמונת פרופיל"
            >
              <Edit2 size={16} />
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>

          <div className="profile-info">
            <h2>{form.fullName}</h2>
            <span className="subtitle">משתמש רגיל</span>
          </div>
        </div>

        {/* FORM */}
        <div className="profile-form-grid">
          <Field label="שם מלא">
            <input
              value={form.fullName}
              onChange={(e) =>
                update("fullName", e.target.value)
              }
            />
          </Field>

          <Field label="אימייל">
            <input
              type="email"
              value={form.email}
              onChange={(e) =>
                update("email", e.target.value)
              }
            />
          </Field>

          <Field label="טלפון">
            <input
              value={form.phone}
              onChange={(e) =>
                update("phone", e.target.value)
              }
            />
          </Field>
        </div>

        {/* ACTION */}
        <div className="profile-actions">
          <button className="save-btn">
            שמירת שינויים
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="field">
      <label>{label}</label>
      {children}
    </div>
  );
}
