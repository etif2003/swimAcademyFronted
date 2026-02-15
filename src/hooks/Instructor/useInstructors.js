import { useQuery } from "@tanstack/react-query";
import { handleInstructors } from "../../api/instructors-functions";

export const useInstructors = () => {
  return useQuery({
    queryKey: ["instructors"],
    queryFn: handleInstructors,
    staleTime: 1000 * 60 * 5,
  });
};
