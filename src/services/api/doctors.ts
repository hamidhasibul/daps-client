import { axiosIns } from "@/lib/utils";
import { AddDoctorValues } from "@/pages/Doctors/components/doctor-modal";

export const getDoctors = async () => {};

export const addDoctor = async (data: AddDoctorValues) => {
  return (
    await axiosIns.post("/doctors", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  ).data;
};
