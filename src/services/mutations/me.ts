import { Profile } from "@/types/queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../api/me";
import { toast } from "sonner";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Profile) => updateProfile(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Profile updated successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Oops!", {
        description: "An unexpected error occurred. Please try again.",
      });
    },
  });
};
