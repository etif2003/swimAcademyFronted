import { phoneRegex, emailRegex } from "../../constants/regexes";

export const validateSchoolForm = (form) => {
  const errors = {};

  /* ===== שדות חובה ===== */

  if (!form.name || !form.name.trim()) {
    errors.name = "יש להזין שם בית ספר";
  }

  if (!form.area) {
    errors.area = "יש לבחור אזור פעילות";
  }

  /* ===== תקינות ===== */

  if (form.contactPhone && !phoneRegex.test(form.contactPhone)) {
    errors.contactPhone = "מספר טלפון לא תקין";
  }

  if (form.contactEmail && !emailRegex.test(form.contactEmail)) {
    errors.contactEmail = "כתובת אימייל לא תקינה";
  }

  return errors;
};
