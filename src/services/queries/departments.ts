import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getDepartments } from "../api/departments";

export const useDepartments = (options: {
  pageIndex: number;
  pageSize: number;
}) => {
  return useQuery({
    queryKey: ["departments", options],
    queryFn: () => getDepartments(options),
    placeholderData: keepPreviousData,
  });
};
