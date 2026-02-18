const BASE_URL = "http://localhost:3000/api/courses";


const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const handleCourses = async () => {
  const response = await fetch(BASE_URL);
  const data = await response.json();
  return data.map((course) => {
    return { ...course };
  });
};

export const fetchSingleCourse = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`);

  if (!response.ok) throw new Error("Course not found");
  return response.json();
};

export const fetchCoursesByCreator = async (
  creatorType,
  creatorId
) => {
  const response = await fetch(
    `${BASE_URL}/by-creator/type/${creatorType}/id/${creatorId}`,
    {
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok)
    throw new Error("Failed to fetch creator courses");

  return response.json();
};


export const createCourse = async (courseData) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(courseData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Create course error:", errorText);
    throw new Error("Failed to create course");
  }

  return response.json();
};


export const updateCourse = async (id, courseData) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(courseData),
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("Update error:", text);
    throw new Error("שגיאה בעדכון הקורס");
  }

  return response.json();
};
