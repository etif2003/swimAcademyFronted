export const handleCourses = async () => {
  const response = await fetch("http://localhost:3000/api/courses");
  const data = await response.json();
  return data.map((course) => {
    return { ...course };
  });
};

export const fetchSingleCourse = async (id) => {
  const response = await fetch(`http://localhost:3000/api/courses/${id}`);

  if (!response.ok) throw new Error("Course not found");
  return response.json();
};
