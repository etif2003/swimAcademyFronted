import { useState, useRef } from "react";
import "../../../styles/InstructorProfile.css";
import { AREAS } from "../../../constants/areas";

export default function InstructorProfileCard({ instructor }) {
  const fileInputRef = useRef(null);

  // placeholder פשוט
  const [imagePreview, setImagePreview] = useState(
    instructor.image ||
      "https://via.placeholder.com/200x200.png?text=Profile"
  );

  const [certificates, setCertificates] = useState(
    instructor.certificates || []
  );

  const [newCert, setNewCert] = useState("");

  const [form, setForm] = useState({
    fullName: instructor.fullName,
    phone: instructor.phone,
    workArea: instructor.workArea,
    experienceYears: instructor.experienceYears,
    hourlyRate: instructor.hourlyRate,
  });

  const update = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  // פתיחת בוחר קבצים
  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  // בחירת תמונה + preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("נא לבחור קובץ תמונה בלבד");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // תעודות
  const addCertificate = () => {
    if (!newCert.trim()) return;
    setCertificates([...certificates, newCert.trim()]);
    setNewCert("");
  };

  const removeCertificate = (index) => {
    setCertificates(certificates.filter((_, i) => i !== index));
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
            >
              ✎
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
            <span className="subtitle">מדריך מוסמך</span>
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

          <Field label="טלפון">
            <input
              value={form.phone}
              onChange={(e) =>
                update("phone", e.target.value)
              }
            />
          </Field>

          <Field label="אזור">
            <select
              value={form.workArea}
              onChange={(e) =>
                update("workArea", e.target.value)
              }
            >
              <option value="">בחר אזור</option>
              {AREAS.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </Field>

          <Field label="שנות ניסיון">
            <input
              type="number"
              value={form.experienceYears}
              onChange={(e) =>
                update("experienceYears", e.target.value)
              }
            />
          </Field>

          <Field label="מחיר לשעה (₪)">
            <input
              type="number"
              value={form.hourlyRate}
              onChange={(e) =>
                update("hourlyRate", e.target.value)
              }
            />
          </Field>
        </div>

        {/* CERTIFICATES */}
        <div className="profile-certificates">
          <span className="section-title">תעודות והסמכות</span>

          <div className="cert-list">
            {certificates.map((c, i) => (
              <span key={i} className="cert-chip">
                {c}
                <button
                  className="remove-cert"
                  onClick={() => removeCertificate(i)}
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          <div className="cert-add">
            <input
              placeholder="הוסף תעודה"
              value={newCert}
              onChange={(e) =>
                setNewCert(e.target.value)
              }
            />
            <button onClick={addCertificate}>
              הוסף
            </button>
          </div>
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
