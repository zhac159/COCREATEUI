import { StateCreator } from 'zustand';
import { UserLoginResponseDTO } from "@/api/model";
import { router } from "expo-router";
import { AuthState, defaultAuth } from './authTypes';

export interface AuthSlice {
  setAuth: (auth: UserLoginResponseDTO) => void;
  logOut: () => void;
}

export const createAuthSlice: StateCreator<AuthSlice & AuthState> = (set) => ({
  auth: defaultAuth,
  setAuth: (auth) => set({ auth }),
  logOut: () => {
    set({ auth: defaultAuth });
    router.replace("/");
  },
});