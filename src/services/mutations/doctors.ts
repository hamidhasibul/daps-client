import { AddDoctorValues } from "@/pages/Doctors/components/doctor-modal";
import { useMutation } from "@tanstack/react-query";
import { addDoctor } from "../api/doctors";
import { toast } from "sonner";

export const useCreateDoc = () => {
  return useMutation({
    mutationFn: (data: AddDoctorValues) => addDoctor(data),
    onSuccess: async () => {
      toast.success("Doctor added successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Oops!", {
        description: "An unexpected error occurred. Please try again.",
      });
    },
  });
};
