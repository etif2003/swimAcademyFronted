const BASE_URL = "http://localhost:3000/api/school-instructors";

export const addInstructorToSchool = async ({
  instructorId,
  schoolId,
  role = "Primary",
}) => {
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
    body: JSON.stringify({
      instructorId,
      schoolId,
      role,
    }),
  });

  if (response.status === 401) {
    localStorage.removeItem("token");
    throw new Error("Session expired");
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to link instructor");
  }

  return data;
};



export const fetchSchoolInstructors = async (schoolId) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${BASE_URL}/by-school/${schoolId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch school instructors");
  }

  return response.json();
};

export const unlinkInstructorFromSchool = async (linkId) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${BASE_URL}/${linkId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to unlink instructor");
  }

  return response.json();
};
