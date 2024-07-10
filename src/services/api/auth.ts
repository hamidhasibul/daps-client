import { axiosIns } from "@/lib/utils";

export const logOut = async () => {
  await axiosIns.get("/logout");
};
