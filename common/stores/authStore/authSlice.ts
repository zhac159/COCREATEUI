import { StateCreator } from 'zustand';
import { router } from "expo-router";
import { AuthState, defaultAuth } from './authTypes';
import { AuthenticatedUser } from '@/api2/model';

export interface AuthSlice {
  setAuth: (auth: AuthenticatedUser) => void;
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