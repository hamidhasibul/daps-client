import { axiosIns } from "@/lib/utils";

export const getDepartments = async ({
  pageIndex,
  pageSize,
}: {
  pageIndex: number;
  pageSize: number;
}) => {
  return (
    await axiosIns.get(`/departments?page=${pageIndex + 1}&limit=${pageSize}`)
  ).data;
};
