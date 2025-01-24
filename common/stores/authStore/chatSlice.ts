import { StateCreator } from "zustand";
import { AuthState } from "./authTypes";
import { ChatDTO } from "@/api/model";

export interface ChatSlice {
  getChatById: (id: number) => ChatDTO | undefined;
}

export const createChatSlice: StateCreator<
  AuthState & ChatSlice,
  [],
  [],
  ChatSlice
> = (set, get) => ({
  getChatById: (id) => {
    return get().auth.chats.find((chat) => chat.id === id);
  },
});
