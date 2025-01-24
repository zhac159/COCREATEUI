import { ChatDTO, ChatMemberDTO } from "@/api/model";
import { useDecomposeChat } from "@/components/Chat/hooks/useDecomposeChat";
import { createContext, useContext } from "react";

type ChatProviderContextType = {
  chat: ChatDTO;
  symmetricKey: string;
  memberIds: number[];
  userIdToMember: Map<number, ChatMemberDTO>;
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

export function ChatProvider({
  children,
  chat,
  symmetricKey,
}: ChatProviderProps) {
  const { memberIds, userIdToMember } = useDecomposeChat(chat);

  return (
    <ChatContext.Provider
      value={{ chat, symmetricKey, memberIds, userIdToMember }}
    >
      {children}
    </ChatContext.Provider>
  );
}
