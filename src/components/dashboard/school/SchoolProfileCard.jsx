import { useState, useRef, useEffect } from "react";
import "../../../styles/UserProfile.css";
import "../../../styles/validations-errors.css";
import "../../../styles/success.css";

import { AREAS } from "../../../constants/areas";
import { Edit2 } from "lucide-react";

import {
  fetchSchoolByOwner,
  createSchool,
  updateSchool,
} from "../../../api/schools-functions";

import { useAuth } from "../../../context/AuthContext";
import { validateSchoolForm } from "../../../utils/validators/validateSchoolForm";

export default function SchoolProfileCard() {
  const { user } = useAuth();
  const userId = user?.id;

  const logoInputRef = useRef(null);

  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const [logoPreview, setLogoPreview] = useState(
    "https://ui-avatars.com/api/?name=School&background=0BBBD6&color=fff&size=200"
  );

  const [form, setForm] = useState({
    name: "",
    description: "",
    area: "",
    city: "",
    address: "",
    image: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
  });

  /* ===== LOAD SCHOOL ===== */
  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const loadSchool = async () => {
      try {
        const data = await fetchSchoolByOwner(userId);

        if (data) {
          setSchool(data);
          setForm({
            name: data.name || "",
            description: data.description || "",
            area: data.area || "",
            city: data.location?.city || "",
            address: data.location?.address || "",
            image: data.image || "",
            contactName: data.contactName || "",
            contactPhone: data.contactPhone || "",
            contactEmail: data.contactEmail || "",
          });

          if (data.image) setLogoPreview(data.image);
        } else {
          setSchool(null); // יצירה ראשונה
        }
      } catch (err) {
        console.error("Failed to load school:", err);
      } finally {
        setLoading(false);
      }
    };

    loadSchool();
  }, [userId]);

  /* ===== UPDATE FORM ===== */
  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));

    if (successMessage) {
      setSuccessMessage("");
    }
  };

  /* ===== LOGO UPLOAD ===== */
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("נא לבחור קובץ תמונה בלבד");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result);
      update("image", reader.result);
    };
    reader.readAsDataURL(file);
  };

  /* ===== SAVE ===== */
  const handleSave = async () => {
    const validationErrors = validateSchoolForm(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    const payload = {
      ownerId: userId,
      name: form.name,
      description: form.description,
      area: form.area,
      location: {
        city: form.city,
        address: form.address,
      },
      image: form.image,
      contactName: form.contactName,
      contactPhone: form.contactPhone,
      contactEmail: form.contactEmail,
      status: "Active",
    };

    try {
      if (!school) {
        const created = await createSchool(payload);
        setSchool(created);
      } else {
        const updated = await updateSchool(school._id, payload);
        setSchool(updated);
      }

      setSuccessMessage("פרטי בית הספר נשמרו בהצלחה 🎉");
    } catch (err) {
      alert(err.message || "שגיאה בשמירת פרטי בית הספר");
    }
  };

  /* ===== RENDER ===== */
  if (loading) {
    return <p>טוען פרופיל...</p>;
  }

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        {/* HEADER */}
        <div className="profile-header">
          <div className="avatar-wrapper logo">
            <img src={logoPreview} alt="לוגו בית ספר" />

            <button
              type="button"
              className="edit-avatar"
              onClick={() => logoInputRef.current.click()}
              aria-label="עריכת לוגו"
            >
              <Edit2 size={14} />
            </button>

            <input
              ref={logoInputRef}
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              style={{ display: "none" }}
            />
          </div>

          <div className="profile-info">
            <h2>{form.name || "שם בית הספר"}</h2>
            <span className="subtitle">בית ספר</span>
          </div>
        </div>

        {/* BASIC INFO */}
        <div className="profile-form-grid">
          <Field label="שם בית ספר">
            <input
              className={errors.name ? "error" : ""}
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
            />
            {errors.name && (
              <span className="field-error">{errors.name}</span>
            )}
          </Field>

          <Field label="תיאור" full>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
            />
          </Field>
        </div>

        {/* LOCATION */}
        <div className="form-section">
          <h4 className="section-title">אזור ומיקום</h4>

          <div className="profile-form-grid">
            <Field label="אזור">
              <select
                className={errors.area ? "error" : ""}
                value={form.area}
                onChange={(e) => update("area", e.target.value)}
              >
                <option value="">בחר אזור</option>
                {AREAS.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
              {errors.area && (
                <span className="field-error">{errors.area}</span>
              )}
            </Field>

            <Field label="עיר">
              <input
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
              />
            </Field>

            <Field label="כתובת" full>
              <input
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
              />
            </Field>
          </div>
        </div>

        {/* CONTACT */}
        <div className="form-section">
          <h4 className="section-title">פרטי איש קשר</h4>

          <div className="profile-form-grid">
            <Field label="שם איש קשר">
              <input
                value={form.contactName}
                onChange={(e) =>
                  update("contactName", e.target.value)
                }
              />
            </Field>

            <Field label="טלפון איש קשר">
              <input
                className={errors.contactPhone ? "error" : ""}
                value={form.contactPhone}
                onChange={(e) =>
                  update("contactPhone", e.target.value)
                }
              />
              {errors.contactPhone && (
                <span className="field-error">
                  {errors.contactPhone}
                </span>
              )}
            </Field>

            <Field label="אימייל איש קשר">
              <input
                type="email"
                className={errors.contactEmail ? "error" : ""}
                value={form.contactEmail}
                onChange={(e) =>
                  update("contactEmail", e.target.value)
                }
              />
              {errors.contactEmail && (
                <span className="field-error">
                  {errors.contactEmail}
                </span>
              )}
            </Field>
          </div>
        </div>

        {/* ACTION */}
        <div className="profile-actions">
          <button className="save-btn" onClick={handleSave}>
            {school ? "שמירת שינויים" : "יצירת בית ספר"}
          </button>

          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, children, full }) {
  return (
    <div className={`field ${full ? "full" : ""}`}>
      <label>{label}</label>
      {children}
    </div>
  );
}
