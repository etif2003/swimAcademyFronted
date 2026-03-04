import { useQuery } from "@tanstack/react-query";
import { handleCourses } from "../api/courses-functions";

export const useCourses = (creatorId = null, creatorType="School") => {
  return useQuery({
    queryKey: ["courses", creatorId, creatorType], 
    queryFn: () => handleCourses(creatorId, creatorType),
    staleTime: 1000 * 60 * 5,
  });
};