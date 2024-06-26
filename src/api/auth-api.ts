import { SignInFormValues } from "@/components/signin-card";
import { axiosIns } from "@/lib/utils";
import { LoginResponse } from "./types";
import axios from "axios";

export const loginUserFn = async (
  userCreds: SignInFormValues
): Promise<LoginResponse> => {
  try {
    const response = await axiosIns.post<LoginResponse>("/login", userCreds);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
