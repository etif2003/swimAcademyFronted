import { useQuery } from "@tanstack/react-query";
import { handleInstructorSchool } from "../../api/schoolInstructor-functions";

export const useInstructorSchool = (schoolId = null) => {
  return useQuery({
    queryKey: ["instructorSchool", schoolId],
    queryFn: () => handleInstructorSchool(schoolId),
    staleTime: 1000 * 60 * 5,
  });
};
