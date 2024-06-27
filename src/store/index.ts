import { User } from "@/api/types";
import { create } from "zustand";

interface Store {
  accessToken: string | null;
  user: User | null;
  setAccessToken: (token: string) => void;
  setUser: (user: User) => void;
}

const useStore = create<Store>((set) => ({
  accessToken: null,
  user: null,
  setAccessToken: (token) => set((state) => ({ ...state, accessToken: token })),
  setUser: (user) => set((state) => ({ ...state, user })),
}));

export default useStore;
