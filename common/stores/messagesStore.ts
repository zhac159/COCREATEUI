import { createWithEqualityFn as create } from "zustand/traditional";
import { Message } from "../types/Message";

type MessagesState = {
  messages: Map<number, Message[]>;
  addInitialMessages: (messages: Map<number, Message[]>) => void;
  addMessages: (messages: Message[], before?: boolean) => void;
  getChatMessages: (chatId: number) => Message[];
  getLastChatMessages: (chatId: number) => Message | undefined;
};

export const useMessagesStore = create<MessagesState>((set, get) => ({
  messages: new Map(),

  addInitialMessages(messages) {
    set((state) => {
      return {
        messages: new Map([...state.messages, ...messages]),
      };
    });
  },
  addMessages(messages, boolean) {
    set((state) => {
      for (const message of messages) {
        const chatMessages = state.messages.get(message.chatId) || [];
        let newMessages = [...chatMessages, message];
        if(boolean) {
          newMessages = [message, ...chatMessages];
        }
        state.messages.set(message.chatId, newMessages);
      }
      return {
        messages: state.messages,
      };
    });
  },
  getChatMessages(chatId) {
    return get().messages.get(chatId) || [];
  },
  getLastChatMessages(chatId) {
    const messages = get().messages.get(chatId) || [];
    return messages[messages.length - 1] || undefined;
  },
}));
