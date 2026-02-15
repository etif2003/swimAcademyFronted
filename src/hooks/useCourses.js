import { useQuery } from "@tanstack/react-query";
import { handleCourses } from "../api/courses-functions";

export const useCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: handleCourses,
    staleTime: 1000 * 60 * 5,
  });
};
