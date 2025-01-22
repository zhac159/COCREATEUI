import { createWithEqualityFn as create } from "zustand/traditional";
import { Message } from "../types/Message";

type MessagesState = {
  messages: Map<number, Message[]>;
  addInitialMessages: (messages: Message[]) => void;
};

export const useMessagesStore = create<MessagesState>((set) => ({
  messages: new Map(),

  addInitialMessages: (messages) =>
    set(() => {
      const newMessages = new Map<number, Message[]>();
      for (const message of messages) {
        if (!newMessages.has(message.chatId)) {
          newMessages.set(message.chatId, []);
        }
        newMessages.get(message.chatId)?.push(message);
      }
      return { messages: newMessages };
    }),
}));
