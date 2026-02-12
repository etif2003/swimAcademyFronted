const BASE_URL = "http://localhost:3000/api/schools";

/* ===== GET SCHOOL BY OWNER ===== */
export const fetchSchoolByOwner = async (userId) => {
  const response = await fetch(`${BASE_URL}/by-owner/${userId}`);

  if (response.status === 404) {
    return null; // אין בית ספר – יצירה ראשונה
  }

  if (!response.ok) {
    throw new Error("Failed to fetch school");
  }

  return response.json();
};

/* ===== CREATE SCHOOL ===== */
export const createSchool = async (payload) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Failed to create school");
  }

  return response.json();
};

/* ===== UPDATE SCHOOL ===== */
export const updateSchool = async (schoolId, payload) => {
  const response = await fetch(`${BASE_URL}/${schoolId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Failed to update school");
  }

  return response.json();
};
