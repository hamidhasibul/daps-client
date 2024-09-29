import { axiosIns } from "@/lib/utils";
import { AddDeptValues } from "@/pages/Departments/components/dept-side-modal";
import { GetDepartmentsResponse } from "@/types/queries";

export const getDepartments = async ({
  pageIndex,
  pageSize,
}: {
  pageIndex?: number;
  pageSize?: number;
}): Promise<GetDepartmentsResponse> => {
  return (
    await axiosIns.get(
      `/departments?page=${
        pageIndex !== undefined ? pageIndex + 1 : ""
      }&limit=${pageSize ? pageSize : ""}`
    )
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
