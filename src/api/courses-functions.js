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