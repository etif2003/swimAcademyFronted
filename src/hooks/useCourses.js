import { useQuery } from "@tanstack/react-query";
import { handleCourses } from "../api/courses-functions";
import { transformCourses } from "../utils/course-utils";

export const useCourses = ({ level, audience, category, search }) => {
  return useQuery({
    queryKey: ["courses", { level, audience, category, search }],
    queryFn: handleCourses,
    select: (data) =>
      transformCourses(data, { level, audience, category, search }),
    staleTime: 1000 * 60 * 5,
  });
};
