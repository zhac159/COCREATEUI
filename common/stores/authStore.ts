import { UserLoginResponseDTO } from "@/api/model";
import { router } from "expo-router";
import { create } from "zustand";

type AuthState  = {
  auth: UserLoginResponseDTO;
}
type  AuthActions = {
  setAuth: (auth: UserLoginResponseDTO) => void;
  logOut: () => void;
}

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  auth: {
    bannerPictureSrc: "",
    email: "",
    userId: 0,
    username: "",
    coins: 0,
  },
  setAuth: (auth) => set((state) => ({ ...state, ...auth })),
  logOut: () => {
    set((state) => {
      return { ...state, auth: undefined };
    });
    router.replace("/");
  },
}));
