import { AREA_VALUES } from "../../constants/areas";

const CATEGORY_VALUES = ["All","Learning", "Training", "Therapy"];
const AUDIENCE_VALUES = ["All","Children", "Teens", "Adults", "Seniors"];
const LEVEL_VALUES = ["All","Beginner", "Advanced", "Professional"];


export function validateCourseForm(data) {
  const errors = {};

  /* ===== Required ===== */

  if (!data.title?.trim()) {
    errors.title = "יש להזין שם קורס";
  }

  if (!data.description?.trim()) {
    errors.description = "יש להזין תיאור קורס";
  }

  if (data.price === "" || data.price === undefined) {
    errors.price = "יש להזין מחיר";
  }

  if (!data.category) {
    errors.category = "יש לבחור קטגוריה";
  }

  if (!data.targetAudience) {
    errors.targetAudience = "יש לבחור קהל יעד";
  }

  if (!data.level) {
    errors.level = "יש לבחור רמה";
  }

  if (!data.area) {
    errors.area = "יש לבחור אזור";
  }

  if (!data.location?.city?.trim()) {
    errors.city = "יש להזין עיר";
  }

  /* ===== Number rules ===== */

  if (data.price !== "" && Number(data.price) < 0) {
    errors.price = "מחיר לא יכול להיות שלילי";
  }

  if (
    data.maxParticipants &&
    Number(data.maxParticipants) < 1
  ) {
    errors.maxParticipants = "מינימום משתתף אחד";
  }

  if (
    data.durationWeeks &&
    Number(data.durationWeeks) < 1
  ) {
    errors.durationWeeks = "משך חייב להיות לפחות שבוע אחד";
  }

  if (
    data.sessionsCount &&
    Number(data.sessionsCount) < 1
  ) {
    errors.sessionsCount = "מספר מפגשים חייב להיות לפחות 1";
  }

  /* ===== Enum validation ===== */

  if (
    data.category &&
    !CATEGORY_VALUES.includes(data.category)
  ) {
    errors.category = "קטגוריה לא חוקית";
  }

  if (
    data.targetAudience &&
    !AUDIENCE_VALUES.includes(data.targetAudience)
  ) {
    errors.targetAudience = "קהל יעד לא חוקי";
  }

  if (
    data.level &&
    !LEVEL_VALUES.includes(data.level)
  ) {
    errors.level = "רמה לא חוקית";
  }

  if (
    data.area &&
    !AREA_VALUES.includes(data.area)
  ) {
    errors.area = "אזור לא חוקי";
  }

  return errors;
}
