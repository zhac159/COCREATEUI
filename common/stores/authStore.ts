import { AuthSlice, createAuthSlice } from "./authSlice";
import { createProjectSlice, ProjectSlice } from "./projectSlice";
import { AuthState } from "./authTypes";
import { devtools } from "zustand/middleware";
import { ChatSlice, createChatSlice } from "./chatSlice";
import { createWithEqualityFn as create } from 'zustand/traditional'


export const useAuthStore = create<AuthState & AuthSlice & ProjectSlice & ChatSlice>()(
  devtools(
    (...props) => ({
      ...createAuthSlice(...props),
      ...createProjectSlice(...props),
      ...createChatSlice(...props),
    }),
    { name: "AuthStore" }
  )
);