import { useState, useRef } from "react";
import "../../../styles/UserProfile.css";
import { AREAS } from "../../../constants/areas";
import { Edit2 } from "lucide-react";

export default function SchoolProfileCard({ school }) {
  const logoInputRef = useRef(null);

  /* ===== Logo (avatar style) ===== */
  const [logoPreview, setLogoPreview] = useState(
    school.logo || "https://ui-avatars.com/api/?name=School&background=0BBBD6&color=fff&size=200"
  );

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("נא לבחור קובץ תמונה בלבד");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setLogoPreview(reader.result);
    reader.readAsDataURL(file);
  };

  /* ===== Form ===== */
  const [form, setForm] = useState({
    name: school.name || "",
    description: school.description || "",
    area: school.area || "",
    city: school.location?.city || "",
    address: school.location?.address || "",
    imageFile: null, // תמונת בית ספר
    contactName: school.contact?.name || "",
    contactPhone: school.contact?.phone || "",
    contactEmail: school.contact?.email || "",
  });

  const update = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        {/* HEADER */}
        <div className="profile-header">
          {/* LOGO */}
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
            <h2>{form.name}</h2>
            <span className="subtitle">בית ספר</span>
          </div>
        </div>

        {/* BASIC INFO */}
        <div className="profile-form-grid">
          <Field label="שם בית ספר">
            <input
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
            />
          </Field>

          <Field label="תמונת בית ספר">
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                update("imageFile", e.target.files[0])
              }
            />
          </Field>

          <Field label="תיאור" full>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) =>
                update("description", e.target.value)
              }
            />
          </Field>
        </div>

        {/* LOCATION SECTION */}
        <div className="form-section">
          <h4 className="section-title">אזור ומיקום</h4>

          <div className="profile-form-grid">
            <Field label="אזור">
              <select
                value={form.area}
                onChange={(e) =>
                  update("area", e.target.value)
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

            <Field label="עיר">
              <input
                value={form.city}
                onChange={(e) =>
                  update("city", e.target.value)
                }
              />
            </Field>

            <Field label="כתובת" full>
              <input
                value={form.address}
                onChange={(e) =>
                  update("address", e.target.value)
                }
              />
            </Field>
          </div>
        </div>

        {/* CONTACT SECTION */}
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
                value={form.contactPhone}
                onChange={(e) =>
                  update("contactPhone", e.target.value)
                }
              />
            </Field>

            <Field label="אימייל איש קשר">
              <input
                type="email"
                value={form.contactEmail}
                onChange={(e) =>
                  update("contactEmail", e.target.value)
                }
              />
            </Field>
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

function Field({ label, children, full }) {
  return (
    <div className={`field ${full ? "full" : ""}`}>
      <label>{label}</label>
      {children}
    </div>
  );
}
