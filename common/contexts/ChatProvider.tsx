import { ChatDTO } from "@/api/model";
import { createContext, useContext } from "react";

type ChatProviderContextType = {
  chat: ChatDTO;
  symmetricKey: string;
};

const ChatContext = createContext<ChatProviderContextType | null>(null);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};

type ChatProviderProps = {
  children: React.ReactNode;
  symmetricKey: string;
  chat: ChatDTO;
};

export function ChatProvider({ children, chat, symmetricKey }: ChatProviderProps) {

  return (
    <ChatContext.Provider value={{ chat, symmetricKey: symmetricKey }}>
      {children}
    </ChatContext.Provider>
  );
}
