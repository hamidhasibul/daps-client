import { axiosIns } from "@/lib/utils";
import { Profile } from "@/types/queries";

export const getProfileData = async () => {
  return (await axiosIns.get("me")).data.user;
};

export const updateProfile = async (data: Profile) => {
  await axiosIns.patch("me", data);
};
