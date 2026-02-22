import { getAuthHeaders } from "./get-auth";

const BASE_URL = "http://localhost:3000/api/registrations";

// =======================
// GET REGISTRATIONS BY COURSE
// =======================
export const getRegistrationsByCourse = async (courseId) => {
  const response = await fetch(
    `${BASE_URL}/by-course/${courseId}`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Get registrations error:", errorText);
    throw new Error("שגיאה בשליפת נרשמים");
  }

  return response.json();
};


export const getMyRegistrations = async (userId) => {
  const response = await fetch(
    `${BASE_URL}/by-user/${userId}`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("שגיאה בשליפת ההרשמות");
  }

  return response.json();
};


// =======================
// CREATE REGISTRATION
// =======================
export const createRegistration = async ({ userId, courseId }) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      userId,
      courseId,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Create registration error:", errorData);
    throw new Error(errorData.message || "שגיאה בהרשמה לקורס");
  }

  return response.json();
};
