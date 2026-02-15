export const transformSchools = (
  allData,
  { area, search },
) => {
  if (!allData) return [];

  const filtered = allData.filter((school) => {
    const matchArea = !area || school.area === area;
    const matchSearch = school.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchArea && matchSearch;
  });

  return [...filtered];
};
