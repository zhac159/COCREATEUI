import { create } from "zustand";
import { AuthSlice, createAuthSlice } from "./authSlice";
import { createProjectSlice, ProjectSlice } from "./projectActions";
import { AuthState } from "./authTypes";
import { devtools } from "zustand/middleware";

export const useAuthStore = create<AuthState & AuthSlice & ProjectSlice>()(
  devtools(
    (...props) => ({
      ...createAuthSlice(...props),
      ...createProjectSlice(...props),
    }),
    { name: "AuthStore" }
  )
);