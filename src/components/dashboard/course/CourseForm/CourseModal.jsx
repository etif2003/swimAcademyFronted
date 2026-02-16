import { useState, useEffect } from "react";
import { useAuth } from "../../../../context/AuthContext";
import { uploadImage } from "../../../../api/upload";
import { AREAS } from "../../../../constants/areas";

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
  }, [course, isOpen]);

  if (!isOpen) return null;

  /* ===== Helpers ===== */

  const update = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const updateLocation = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [key]: value,
      },
    }));
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
      createdBy: user?.id,
      createdByModel: user?.role,
    };

    try {
      const res = await fetch(
        isEdit ? `/api/courses/${course._id}` : "/api/courses",
        {
          method: isEdit ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(payload),
        },
      );

      if (!res.ok) throw new Error("שגיאה בשמירה");

      const data = await res.json();
      onSuccess?.(data);
      onClose();
    } catch (err) {
      alert(err.message);
    }
  };

  /* ===== Options ===== */

  const categoryOptions = [
    { label: "כל הקטגוריות", value: "" },
    { label: "למידה", value: "Learning" },
    { label: "הכשרה", value: "Training" },
    { label: "טיפולי", value: "Therapy" },
  ];

  const audienceOptions = [
    { label: "כל הקהלים", value: "" },
    { label: "ילדים", value: "Children" },
    { label: "נוער", value: "Teens" },
    { label: "מבוגרים", value: "Adults" },
    { label: "גיל הזהב", value: "Seniors" },
  ];

  const levelOptions = [
    { label: "כל הרמות", value: "" },
    { label: "מתחילים", value: "Beginner" },
    { label: "מתקדמים", value: "Advanced" },
    { label: "מקצועי", value: "Professional" },
  ];

  const areaOptions = AREAS.map((area) => ({
    label: area,
    value: area,
  }));

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "עריכת קורס" : "יצירת קורס חדש"}
    >
      <form className="form" onSubmit={handleSubmit}>
        {/* 1. שם הקורס */}
        <div className="form-row single">
          <FormField
            label="שם הקורס"
            value={formData.title}
            onChange={(e) => update("title", e.target.value)}
          />
        </div>

        {/* 2. תיאור הקורס */}
        <div className="form-row single">
          <FormTextarea
            label="תיאור הקורס"
            value={formData.description}
            onChange={(e) => update("description", e.target.value)}
          />
        </div>

        {/* 3. קטגוריה | קהל יעד | רמה */}
        <div className="form-row three">
          <FormSelect
            label="קטגוריה"
            options={categoryOptions}
            value={formData.category}
            onChange={(v) => update("category", v)}
          />

          <FormSelect
            label="קהל יעד"
            options={audienceOptions}
            value={formData.targetAudience}
            onChange={(v) => update("targetAudience", v)}
          />

          <FormSelect
            label="רמה"
            options={levelOptions}
            value={formData.level}
            onChange={(v) => update("level", v)}
          />
        </div>

        {/* 4. אזור | עיר | שם בריכה */}
        <div className="form-row three">
          <FormSelect
            label="אזור"
            options={areaOptions}
            value={formData.area}
            onChange={(v) => update("area", v)}
          />

          <FormField
            label="עיר"
            value={formData.location.city}
            onChange={(e) => updateLocation("city", e.target.value)}
          />

          <FormField
            label="שם בריכה"
            value={formData.location.poolName}
            onChange={(e) => updateLocation("poolName", e.target.value)}
          />
        </div>

        {/* 5. מחיר | מקסימום משתתפים */}
        <div className="form-row two">
          <FormField
            label="מחיר (₪)"
            type="number"
            value={formData.price}
            onChange={(e) => update("price", e.target.value)}
          />

          <FormField
            label="מקסימום משתתפים"
            type="number"
            value={formData.maxParticipants}
            onChange={(e) => update("maxParticipants", e.target.value)}
          />
        </div>

        {/* 6. משך | מספר מפגשים */}
        <div className="form-row two">
          <FormField
            label="משך (שבועות)"
            type="number"
            value={formData.durationWeeks}
            onChange={(e) => update("durationWeeks", e.target.value)}
          />

          <FormField
            label="מספר מפגשים"
            type="number"
            value={formData.sessionsCount}
            onChange={(e) => update("sessionsCount", e.target.value)}
          />
        </div>

        {/* 7. תמונת קורס */}
        <div className="form-row single">
          <FormImageUpload
            label="תמונת קורס"
            image={formData.image}
            uploading={uploadingImage}
            onUpload={handleImageUpload}
            onRemove={() => update("image", "")}
          />
        </div>

        {/* 8. ביטול | יצירה */}
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
