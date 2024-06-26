import { create } from "zustand";

interface Store {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
}

const useStore = create<Store>((set) => ({
  accessToken: null,
  setAccessToken: (token) => set((state) => ({ ...state, accessToken: token })),
}));

export default useStore;
