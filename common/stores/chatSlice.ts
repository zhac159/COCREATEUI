import { StateCreator } from "zustand";
import { AuthState } from "./authTypes";

export interface ChatSlice {
}

export const createChatSlice: StateCreator<
  AuthState & ChatSlice,
  [],
  [],
  ChatSlice
> = (set, get) => ({
});
