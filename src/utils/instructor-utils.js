export const transformInstructors = (
  allData,
  { workArea, search },
) => {
  if (!allData) return [];

  const filtered = allData.filter((instructor) => {
    const matchWorkArea = !workArea || instructor.workArea === workArea;
    const matchSearch = instructor.fullName
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchWorkArea && matchSearch;
  });

  return [...filtered];
};
