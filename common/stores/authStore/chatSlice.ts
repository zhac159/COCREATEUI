import { StateCreator } from "zustand";
import { AuthState } from "./authTypes";
import { ChatDTO } from "@/api/model";

export interface ChatSlice {
  getChatById: (id: number) => ChatDTO | undefined;
  getChatWithFilteredMembersById: (id: number) => ChatDTO | undefined;
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
  getChatWithFilteredMembersById: (id) => {
    const chat = get().auth.chats.find((chat) => chat.id === id);
    const userId = get().auth.userId;

    if (!chat) {
      return undefined;
    }
    const members = chat.chatMembers.filter(
      (member) => member.userId !== userId
    );
    return { ...chat, chatMembers: members };
  },
});
