const BASE_URL = "http://localhost:3000/api/schools";

export const handleSchools = async () => {
  const response = await fetch(BASE_URL);
  const data = await response.json();
  return data.map((school) => {
    return { ...school };
  });
};

export const fetchSingleSchool = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`);

  if (!response.ok) throw new Error("School not found");
  return response.json();
};


/* ===== GET SCHOOL BY OWNER ===== */
export const fetchSchoolByOwner = async (userId) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No auth token found");
  }

  const response = await fetch(`${BASE_URL}/by-owner/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

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
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No auth token found");
  }
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,

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
    const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No auth token found");
  }

  const response = await fetch(`${BASE_URL}/${schoolId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,

    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Failed to update school");
  }

  return response.json();
};
