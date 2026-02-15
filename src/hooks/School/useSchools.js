import { useQuery } from "@tanstack/react-query";
import { handleSchools } from "../../api/schools-functions";

export const useSchools = () => {
  return useQuery({
    queryKey: ["schools"],
    queryFn: handleSchools,
    staleTime: 1000 * 60 * 5,
  });
};
