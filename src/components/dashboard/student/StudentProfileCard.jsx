import { useState, useRef, useEffect } from "react";
import "../../../styles/UserProfile.css";
import "../../../styles/validations-errors.css";
import "../../../styles/success.css";

import { Edit2, Trash2 } from "lucide-react";
import { uploadImage } from "../../../api/upload";

import {
  fetchMyProfile,
  updateMyProfile,
} from "../../../api/students-functions";

import { validateStudentForm } from "../../../utils/validators/validateStudentForm";
import { useNavigate } from "react-router";

export default function StudentProfileCard() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const DEFAULT_AVATAR =
    "https://ui-avatars.com/api/?name=Student&background=0BBBD6&color=fff&size=200";

  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const [imagePreview, setImagePreview] = useState(DEFAULT_AVATAR);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    image: "",
  });

  /* ===== LOAD PROFILE (תמיד קיים) ===== */
  useEffect(() => {
    console.log("LOAD PROFILE");
    const loadProfile = async () => {
      try {
        const data = await fetchMyProfile();

        setForm({
          fullName: data.fullName || "",
          email: data.email || "",
          phone: data.phone || "",
          image: data.image || "",
        });

        if (data.image) setImagePreview(data.image);
      } catch (err) {
        console.error("Failed to load profile:", err);
        navigate("/auth");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  /* ===== UPDATE FORM ===== */
  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));

    if (successMessage) {
      setSuccessMessage("");
    }
  };

  /* ===== Image Upload ===== */
  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("נא לבחור קובץ תמונה בלבד");
      return;
    }

    try {
      setUploadingImage(true);

      const url = await uploadImage(file);

      setImagePreview(url);
      update("image", url);
    } catch (err) {
      alert(err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  /* ===== SAVE ===== */
  const handleSave = async () => {
    const validationErrors = validateStudentForm(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      await updateMyProfile({
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        image: form.image,
      });

      setSuccessMessage("הפרופיל עודכן בהצלחה 🎉");
    } catch (err) {
      alert("עליך להתחבר מחדש למערכת");
    }
  };

  if (loading) return <p>...טוען פרופיל</p>;

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        {/* HEADER */}
        <div className="profile-header">
          <div className="avatar-wrapper">
            <img src={imagePreview} alt="תמונת פרופיל" />

            {/* כפתור עריכה */}
            <button
              type="button"
              className="edit-avatar"
              onClick={openFilePicker}
              aria-label="עריכת תמונת פרופיל"
              disabled={uploadingImage}
            >
              {uploadingImage ? "..." : <Edit2 size={16} />}
            </button>

            {/* כפתור מחיקה */}
            {imagePreview !== DEFAULT_AVATAR && (
              <button
                type="button"
                className="delete-avatar"
                onClick={() => {
                  setImagePreview(DEFAULT_AVATAR);
                  update("image", "");
                }}
              >
                <Trash2 size={16} />
              </button>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>

          <div className="profile-info">
            <h2>{form.fullName || "סטודנט"}</h2>
            <span className="subtitle">משתמש רגיל</span>
          </div>
        </div>

        {/* FORM */}
        <div className="profile-form-grid">
          <Field label="שם מלא">
            <input
              className={errors.fullName ? "error" : ""}
              value={form.fullName}
              onChange={(e) => update("fullName", e.target.value)}
            />
            {errors.fullName && (
              <span className="field-error">{errors.fullName}</span>
            )}
          </Field>

          <Field label="אימייל">
            <input
              type="email"
              className={errors.email ? "error" : ""}
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
            />
            {errors.email && (
              <span className="field-error">{errors.email}</span>
            )}
          </Field>

          <Field label="טלפון">
            <input
              className={errors.phone ? "error" : ""}
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
            />
            {errors.phone && (
              <span className="field-error">{errors.phone}</span>
            )}
          </Field>
        </div>

        {/* ACTION */}
        <div className="profile-actions">
          <button className="save-btn" onClick={handleSave}>
            שמירת שינויים
          </button>

          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}
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
