import { useState, useRef, useEffect } from "react";
import "../../../styles/UserProfile.css";
import "../../../styles/validations-errors.css";
import "../../../styles/success.css";
import { uploadImage } from "../../../api/upload";
import { AREAS } from "../../../constants/areas";
import { Edit2, Award, Trash2 } from "lucide-react";
import {
  fetchInstructorByUser,
  createInstructor,
  updateInstructor,
} from "../../../api/instructors-functions";
import { useAuth } from "../../../context/AuthContext";
import { validateInstructorForm } from "../../../utils/validators/validateInstructorForm";
import { useNavigate } from "react-router";

export default function InstructorProfileCard() {
  const navigate = useNavigate();

  const { user } = useAuth();
  const userId = user?.id;

  const fileInputRef = useRef(null);

  const [instructor, setInstructor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [uploadingLogo, setUploadingLogo] = useState(false);

  const DEFAULT_AVATAR =
    "https://ui-avatars.com/api/?name=Instructor&background=0BBBD6&color=fff&size=200";

  const [imagePreview, setImagePreview] = useState(DEFAULT_AVATAR);

  const [certificates, setCertificates] = useState([]);
  const [newCert, setNewCert] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    workArea: "",
    experienceYears: "",
    hourlyRate: "",
  });

  /* ===== LOAD INSTRUCTOR ===== */
  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const loadInstructor = async () => {
      try {
        const data = await fetchInstructorByUser(userId);

        if (data) {
          setInstructor(data);
          setForm({
            fullName: data.fullName || "",
            phone: data.phone || "",
            workArea: data.workArea || "",
            experienceYears: data.experienceYears ?? "",
            hourlyRate: data.hourlyRate ?? "",
          });
          setCertificates(data.certificates || []);
          if (data.image) setImagePreview(data.image);
        } else {
          setInstructor(null); // יצירה ראשונה
        }
      } catch (err) {
        console.error("Failed to load instructor:", err);
        navigate("/auth");
      } finally {
        setLoading(false);
      }
    };

    loadInstructor();
  }, [userId]);

  /* ===== FORM UPDATE ===== */
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
      setUploadingLogo(true);

      const url = await uploadImage(file);

      setImagePreview(url);
    } catch (err) {
      alert(err.message);
    } finally {
      setUploadingLogo(false);
    }
  };

  /* ===== Certificates ===== */
  const addCertificate = () => {
    if (!newCert.trim()) return;
    setCertificates((prev) => [...prev, newCert.trim()]);
    setNewCert("");
  };

  const removeCertificate = (index) => {
    setCertificates((prev) => prev.filter((_, i) => i !== index));
  };

  /* ===== SAVE ===== */
  const handleSave = async () => {
    const validationErrors = validateInstructorForm(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    const payload = {
      ...form,
      certificates,
      image: imagePreview,
      userId,
      status: "Active",
    };

    try {
      if (!instructor) {
        const created = await createInstructor(payload);
        setInstructor(created);
      } else {
        const updated = await updateInstructor(instructor._id, payload);
        setInstructor(updated);
      }

      setSuccessMessage("הפרופיל נשמר בהצלחה 🎉");
    } catch (err) {
      alert(err.message || "שגיאה בשמירת הפרופיל");
    }
  };

  /* ===== RENDER ===== */
  if (loading) {
    return <p>...טוען פרופיל</p>;
  }

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
              disabled={uploadingLogo}
            >
              {uploadingLogo ? "..." : <Edit2 size={16} />}
            </button>

            {imagePreview !== DEFAULT_AVATAR && (
              <button
                type="button"
                className="delete-avatar"
                onClick={() => {
                  setImagePreview(
                    "https://ui-avatars.com/api/?name=Instructor&background=0BBBD6&color=fff&size=200",
                  );
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
            <h2>{form.fullName || "שם המדריך"}</h2>
            <span className="subtitle certified">
              מדריך מוסמך <Award size={14} />
            </span>
          </div>
        </div>

        {/* FORM */}
        <div className="profile-form-grid">
          <Field label="שם מלא">
            <input
              value={form.fullName}
              onChange={(e) => update("fullName", e.target.value)}
            />
            {errors.fullName && (
              <span className="field-error">{errors.fullName}</span>
            )}
          </Field>

          <Field label="טלפון">
            <input
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
            />
            {errors.phone && (
              <span className="field-error">{errors.phone}</span>
            )}
          </Field>

          <Field label="אזור">
            <select
              value={form.workArea}
              onChange={(e) => update("workArea", e.target.value)}
            >
              <option value="">בחר אזור</option>
              {AREAS.map((area) => (
                <option key={area.label} value={area.label}>
                  {area.label}
                </option>
              ))}
            </select>
            {errors.workArea && (
              <span className="field-error">{errors.workArea}</span>
            )}
          </Field>

          <Field label="שנות ניסיון">
            <input
              type="number"
              value={form.experienceYears}
              onChange={(e) => update("experienceYears", e.target.value)}
            />
            {errors.experienceYears && (
              <span className="field-error">{errors.experienceYears}</span>
            )}
          </Field>

          <Field label="מחיר לשעה (₪)">
            <input
              type="number"
              value={form.hourlyRate}
              onChange={(e) => update("hourlyRate", e.target.value)}
            />
            {errors.hourlyRate && (
              <span className="field-error">{errors.hourlyRate}</span>
            )}
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
              onChange={(e) => setNewCert(e.target.value)}
            />
            <button onClick={addCertificate}>הוסף</button>
          </div>
        </div>

        {/* ACTION */}
        <div className="profile-actions">
          <button className="save-btn" onClick={handleSave}>
            {instructor ? "שמירת שינויים" : "יצירת פרופיל"}
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
