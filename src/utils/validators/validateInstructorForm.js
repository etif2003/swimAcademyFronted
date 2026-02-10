import { phoneRegex } from "../../constants/regexes";

export const validateInstructorForm = (form) => {
  const errors = {};

  /* ===== שדות חובה (תואם Mongoose schema) ===== */

  if (!form.fullName || !form.fullName.trim()) {
    errors.fullName = "יש להזין שם מלא";
  }

  if (!form.workArea) {
    errors.workArea = "יש לבחור אזור פעילות";
  }

  /* ===== תקינות שדות ===== */

  if (form.phone && !phoneRegex.test(form.phone)) {
    errors.phone = "מספר טלפון לא תקין";
  }

  if (
    form.experienceYears !== "" &&
    (isNaN(form.experienceYears) || Number(form.experienceYears) < 0)
  ) {
    errors.experienceYears = "שנות ניסיון חייב להיות מספר 0 ומעלה";
  }

  if (
    form.hourlyRate !== "" &&
    (isNaN(form.hourlyRate) || Number(form.hourlyRate) < 0)
  ) {
    errors.hourlyRate = "מחיר לשעה חייב להיות מספר 0 ומעלה";
  }

  return errors;
};
