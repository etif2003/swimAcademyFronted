export const transformCourses = (
  allData,
  { level, audience, category, search },
) => {
  if (!allData) return [];

  const filtered = allData.filter((course) => {
    const matchLevel = !level || course.level === level;
    const matchAudience = !audience || course.targetAudience === audience;
    const matchCategory = !category || course.category === category;
    const matchSearch = course.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchLevel && matchAudience && matchCategory && matchSearch;
  });

  return [...filtered];
};
