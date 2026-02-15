import { useQuery } from "@tanstack/react-query";
import { fetchSingleSchool } from "../../api/schools-functions";

export const useSchool = (id) => {
  return useQuery({
    queryKey: ["school", id],
    queryFn: () => fetchSingleSchool(id),
    enabled: !!id,
  });
};
