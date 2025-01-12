import { UserLoginResponseDTO } from "@/api/model";
import { router } from "expo-router";
import { create } from "zustand";

type AuthState = {
  auth: UserLoginResponseDTO;
};

const defaultAuth: UserLoginResponseDTO = {
  bannerPictureSrc: "",
  email: "",
  userId: 0,
  username: "",
  coins: 0,
};

type AuthActions = {
  setAuth: (auth: UserLoginResponseDTO) => void;
  logOut: () => void;
};

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  auth: defaultAuth,
  setAuth: (auth) => set({ auth }),
  logOut: () => {
    set((state) => {
      return { ...state, auth: defaultAuth };
    });
    router.replace("/");
  },
}));
