import { useState, useEffect } from "react";
import { useAuth } from "../../../../context/AuthContext";
import { uploadImage } from "../../../../api/upload";
import { AREAS } from "../../../../constants/areas";
import { validateCourseForm } from "../../../../utils/validators/validateCourseForm";
import { createCourse, updateCourse } from "../../../../api/courses-functions";
import "../../../../styles/success.css";

import BaseModal from "../../ModalForm/BaseModal";
import FormField from "../../ModalForm/FormField";
import FormTextarea from "../../ModalForm/FormTextarea";
import FormSelect from "../../ModalForm/FormSelect";
import FormImageUpload from "../../ModalForm/FormImageUpload";

const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  targetAudience: "",
  level: "",
  image: "",
  maxParticipants: "",
  durationWeeks: "",
  sessionsCount: "",
  area: "",
  location: {
    poolName: "",
    city: "",
  },
};

export default function CourseModal({ isOpen, onClose, course, onSuccess }) {
  const { user } = useAuth();
  const isEdit = !!course;

  const [formData, setFormData] = useState(initialState);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (course) {
      setFormData({
        ...initialState,
        ...course,
        location: {
          poolName: course.location?.poolName || "",
          city: course.location?.city || "",
        },
      });
    } else {
      setFormData(initialState);
    }

    setErrors({});
  }, [course, isOpen]);

  if (!isOpen) return null;

  /* ===== Helpers ===== */

  const update = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const updateLocation = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [key]: value,
      },
    }));

    if (key === "city") {
      setErrors((prev) => ({ ...prev, city: undefined }));
    }
  };

  /* ===== Image Upload ===== */

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const url = await uploadImage(file);
      update("image", url);
    } catch (err) {
      alert(err.message || "שגיאה בהעלאת תמונה");
    } finally {
      setUploadingImage(false);
    }
  };

  /* ===== Submit ===== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateCourseForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    const payload = {
      ...formData,
      price: Number(formData.price),
      maxParticipants: formData.maxParticipants
        ? Number(formData.maxParticipants)
        : undefined,
      durationWeeks: formData.durationWeeks
        ? Number(formData.durationWeeks)
        : undefined,
      sessionsCount: formData.sessionsCount
        ? Number(formData.sessionsCount)
        : undefined,
    };

    try {
      const data = isEdit
        ? await updateCourse(course._id, payload)
        : await createCourse(payload);

      setSuccessMessage(
        isEdit ? "הקורס עודכן בהצלחה 🎉" : "הקורס נוצר בהצלחה 🎉",
      );

      onSuccess?.(data);
      // נסגור את המודל אחרי 1.5 שניות
      setTimeout(() => {
        setSuccessMessage("");
        onClose();
      }, 1500);
    } catch (err) {
      console.error(err);
      alert(err.message || "שגיאה בשמירה");
    }
  };

  /* ===== Options ===== */

  const categoryOptions = [
    { label: "כל הקטגוריות", value: "All" },
    { label: "למידה", value: "Learning" },
    { label: "הכשרה", value: "Training" },
    { label: "טיפולי", value: "Therapy" },
  ];

  const audienceOptions = [
    { label: "כל הקהלים", value: "All" },
    { label: "ילדים", value: "Children" },
    { label: "נוער", value: "Teens" },
    { label: "מבוגרים", value: "Adults" },
    { label: "גיל הזהב", value: "Seniors" },
  ];

  const levelOptions = [
    { label: "כל הרמות", value: "All" },
    { label: "מתחילים", value: "Beginner" },
    { label: "מתקדמים", value: "Advanced" },
    { label: "מקצועי", value: "Professional" },
  ];

  const areaOptions = AREAS;

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "עריכת קורס" : "יצירת קורס חדש"}
    >
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-row single">
          <FormField
            label="שם הקורס"
            value={formData.title}
            onChange={(e) => update("title", e.target.value)}
            error={errors.title}
          />
        </div>

        <div className="form-row single">
          <FormTextarea
            label="תיאור הקורס"
            value={formData.description}
            onChange={(e) => update("description", e.target.value)}
            error={errors.description}
          />
        </div>

        <div className="form-row three">
          <FormSelect
            label="קטגוריה"
            options={categoryOptions}
            value={formData.category}
            onChange={(v) => update("category", v)}
            error={errors.category}
          />

          <FormSelect
            label="קהל יעד"
            options={audienceOptions}
            value={formData.targetAudience}
            onChange={(v) => update("targetAudience", v)}
            error={errors.targetAudience}
          />

          <FormSelect
            label="רמה"
            options={levelOptions}
            value={formData.level}
            onChange={(v) => update("level", v)}
            error={errors.level}
          />
        </div>

        <div className="form-row three">
          <FormSelect
            label="אזור"
            options={areaOptions}
            value={formData.area}
            onChange={(v) => update("area", v)}
            error={errors.area}
          />

          <FormField
            label="עיר"
            value={formData.location.city}
            onChange={(e) => updateLocation("city", e.target.value)}
            error={errors.city}
          />

          <FormField
            label="שם בריכה"
            value={formData.location.poolName}
            onChange={(e) => updateLocation("poolName", e.target.value)}
          />
        </div>

        <div className="form-row two">
          <FormField
            label="מחיר (₪)"
            type="number"
            value={formData.price}
            onChange={(e) => update("price", e.target.value)}
            error={errors.price}
          />

          <FormField
            label="מקסימום משתתפים"
            type="number"
            value={formData.maxParticipants}
            onChange={(e) => update("maxParticipants", e.target.value)}
            error={errors.maxParticipants}
          />
        </div>

        <div className="form-row two">
          <FormField
            label="משך (שבועות)"
            type="number"
            value={formData.durationWeeks}
            onChange={(e) => update("durationWeeks", e.target.value)}
            error={errors.durationWeeks}
          />

          <FormField
            label="מספר מפגשים"
            type="number"
            value={formData.sessionsCount}
            onChange={(e) => update("sessionsCount", e.target.value)}
            error={errors.sessionsCount}
          />
        </div>

        <div className="form-row single">
          <FormImageUpload
            label="תמונת קורס"
            image={formData.image}
            uploading={uploadingImage}
            onUpload={handleImageUpload}
            onRemove={() => update("image", "")}
          />
        </div>

        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={onClose}>
            ביטול
          </button>

          <button
            type="submit"
            className="btn-primary"
            disabled={uploadingImage}
          >
            {isEdit ? "שמירת שינויים" : "יצירת קורס"}
          </button>
        </div>
      </form>
    </BaseModal>
  );
}
