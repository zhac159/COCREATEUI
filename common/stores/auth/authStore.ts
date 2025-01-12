import { UserLoginResponseDTO } from "@/api/model";
import { create } from "zustand";

interface AuthState {
  auth: UserLoginResponseDTO;
}
interface AuthActions {
  setAuth: (auth: UserLoginResponseDTO) => void;
}

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  auth: {
    bannerPictureSrc: "",
    email: "",
    userId: 0,
    username: "",
  },
  setAuth: (auth) => set((state) => ({ ...state, ...auth })),
}));
