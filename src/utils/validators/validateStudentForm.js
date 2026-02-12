import { phoneRegex, emailRegex } from "../../constants/regexes";

export const validateStudentForm = (form) => {
  const errors = {};

  /* ===== חובה ===== */
  if (!form.fullName || !form.fullName.trim()) {
    errors.fullName = "יש להזין שם מלא";
  }

  if (!form.email || !emailRegex.test(form.email)) {
    errors.email = "כתובת אימייל לא תקינה";
  }

  /* ===== תקינות ===== */
  if (form.phone && !phoneRegex.test(form.phone)) {
    errors.phone = "מספר טלפון לא תקין";
  }

  return errors;
};
