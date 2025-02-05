import { useChat } from "@/common/contexts/ChatProvider";
import { useDatabase } from "@/common/hooks/database/useDatabase";
import { useAuthStore } from "@/common/stores/authStore/authStore";
import { useMessagesStore } from "@/common/stores/messagesStore";
import { Message } from "@/common/types/Message";
import { ForwardedRef, useCallback, useEffect, useState } from "react";
import MessageBubble from "../MessageBubble";
import { FlatList } from "react-native";

export const useChatMessageList = (
  selectMessageToReply: (message: Message) => void,
  chatListRef: ForwardedRef<FlatList<Message>>
) => {
  const userId = useAuthStore((state) => state.auth.userId);
  const { chat } = useChat();

  const messages = useMessagesStore((state) => state.getChatMessages(chat.id));
  const [messagesToRender, setMessagesToRender] = useState<Message[]>([]);

  useEffect(() => {
    setMessagesToRender(messages);
  }, []);

  const addMessages = useMessagesStore((state) => state.addMessages);

  const { getDbMessagesBefore } = useDatabase();

  const handleLoadMore = useCallback(async () => {
    const dbMessages = await getDbMessagesBefore(
      chat.id,
      messages[messages.length - 1]
    );
    if (
      dbMessages[dbMessages.length - 1].id === messages[messages.length - 1].id
    )
      return;

    addMessages(dbMessages, true);
  }, [chat.id, messages]);

  const renderItem = useCallback(
    ({ item }: { item: Message }) => (
      <MessageBubble
        message={item}
        isSent={item.senderId === userId}
        onClick={selectMessageToReply}
        chatListRef={chatListRef}
      />
    ),
    []
  );

  return {
    userId,
    chat,
    messages,
    addMessages,
    getDbMessagesBefore,
    handleLoadMore,
    renderItem,
  };
};
