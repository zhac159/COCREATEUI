import { create } from "zustand";
import { AuthSlice, createAuthSlice } from "./authSlice";
import { createProjectSlice, ProjectSlice } from "./projectActions";
import { AuthState } from "./authTypes";

export const useAuthStore = create<AuthState & AuthSlice & ProjectSlice>(
  (...props) => ({
    ...createAuthSlice(...props),
    ...createProjectSlice(...props),
  })
);
