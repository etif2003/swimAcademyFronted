import { useQuery } from "@tanstack/react-query";
import { fetchSingleCourse } from "../api/courses-functions";

export const useCourse = (id) => {
  return useQuery({
    queryKey: ["course", id],
    queryFn: () => fetchSingleCourse(id),
    enabled: !!id,
  });
};
