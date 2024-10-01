import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getDepartments } from "../api/departments";
import { GetDepartmentsResponse } from "@/types/queries";

export const useDepartments = (
  options: {
    pageIndex?: number;
    pageSize?: number;
  } = {}
) => {
  return useQuery<GetDepartmentsResponse>({
    queryKey: ["departments", options],
    queryFn: () => getDepartments(options),
    placeholderData: keepPreviousData,
  });
};
