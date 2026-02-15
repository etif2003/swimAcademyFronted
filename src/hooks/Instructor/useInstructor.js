import { useQuery } from "@tanstack/react-query";
import { fetchSingleInstructor } from "../../api/instructors-functions";

export const useInstructor = (id) => {
  return useQuery({
    queryKey: ["instructor", id],
    queryFn: () => fetchSingleInstructor(id),
    enabled: !!id,
  });
};
