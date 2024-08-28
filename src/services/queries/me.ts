import { useQuery } from "@tanstack/react-query";
import { getProfileData } from "../api/me";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfileData,
    retry: 1,
  });
};
