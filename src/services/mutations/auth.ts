import { useMutation } from "@tanstack/react-query";
import { logOut } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useLogout = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => logOut(),
    onSuccess: () => {
      localStorage.removeItem("accessToken");
      toast.success("Logged out successfully");
      navigate("/login");
    },
  });
};
