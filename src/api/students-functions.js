const BASE_URL = "http://localhost:3000/api/users";

/* ===== GET MY PROFILE ===== */
export const fetchMyProfile = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No auth token found");
  }

  const response = await fetch(`${BASE_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    localStorage.removeItem("token");
    throw new Error("Session expired");
  }

  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }

  return response.json();
};

/* ===== UPDATE MY PROFILE ===== */
export const updateMyProfile = async (payload) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No auth token found");
  }

  const response = await fetch(`${BASE_URL}/me`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Failed to update profile");
  }

  return response.json();
};
