const BASE_URL = "http://localhost:3000/api/courses";


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
