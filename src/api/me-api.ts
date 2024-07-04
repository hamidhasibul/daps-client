import { isAxiosError } from "axios";

import { axiosIns } from "@/lib/utils";
import { ChangePasswordValues } from "@/pages/Settings/components/change-pass-modal";
import { GenericResponse } from "@/types/api/general";

export const changePassFn = async (
  changePassData: ChangePasswordValues
): Promise<GenericResponse> => {
  try {
    const response = await axiosIns.post<GenericResponse>(
      "/me/change-password",
      changePassData
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
