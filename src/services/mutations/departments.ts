import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDepartment } from "../api/departments";
import { toast } from "sonner";
import { AddDeptValues } from "@/pages/Departments/components/dept-side-modal";

export const useCreateDept = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AddDeptValues) => addDepartment(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["departments"] });
      toast.success("Department added successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Oops!", {
        description: "An unexpected error occurred. Please try again.",
      });
    },
  });
};
