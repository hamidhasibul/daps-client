import { axiosIns } from "@/lib/utils";
import { AddDeptValues } from "@/pages/Departments/components/dept-side-modal";

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

export const addDepartment = async (data: AddDeptValues) => {
  return (
    await axiosIns.post(`/departments`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  ).data;
};
