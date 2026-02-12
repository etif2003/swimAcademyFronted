const BASE_URL = "http://localhost:3000/api/instructors";

export const fetchInstructorByUser = async (userId) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No auth token found");
  }
  const response = await fetch(`${BASE_URL}/by-user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    localStorage.removeItem("token");
    throw new Error("Session expired");
  }

  if (response.status === 404) {
    return null; // אין פרופיל – פעם ראשונה
  }

  if (!response.ok) {
    throw new Error("Failed to fetch instructor profile");
  }

  return response.json();
};

export const createInstructor = async (payload) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Failed to create instructor");
  }

  return response.json();
};

export const updateInstructor = async (instructorId, payload) => {
  const response = await fetch(`${BASE_URL}/${instructorId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Failed to update instructor");
  }

  return response.json();
};
