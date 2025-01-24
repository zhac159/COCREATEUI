import { useChat } from "@/common/contexts/ChatProvider";
import { useDatabase } from "@/common/hooks/database/useDatabase";
import { useAuthStore } from "@/common/stores/authStore/authStore";
import { useMessagesStore } from "@/common/stores/messagesStore";
import { Message } from "@/common/types/Message";
import { ForwardedRef, RefObject, useCallback, useRef } from "react";
import MessageBubble from "../MessageBubble";
import { Animated, LayoutChangeEvent, View } from "react-native";
import { windowHeight } from "@/common/constants/windowDimensions";

export const useChatMessageList = (
  selectMessageToReply: (message: Message) => void,
  flatListRef: RefObject<Animated.FlatList<Message>>
) => {
  const userId = useAuthStore((state) => state.auth.userId);
  const { chat } = useChat();
  const messages = useMessagesStore((state) => state.getChatMessages(chat.id));

  const messageHeights = useRef(new Map<string, number>());

  const onLayout = useCallback((messageId: string, event: LayoutChangeEvent) => {
    messageHeights.current.set(messageId, event.nativeEvent.layout.height);
  }, []);

  const getMessageOffset = useCallback((targetId: string) => {
    let offset = -windowHeight / 3;
    for (const message of messages) {
      if (message.id === targetId) break;
      offset += messageHeights.current.get(message.id) || 100;
    }
    return offset;
  }, [messages]);

  const scrollToMessage = useCallback((message: Message) => {
    const offset = getMessageOffset(message.id);
    flatListRef.current?.scrollToOffset({
      offset,
      animated: true,
    });
  }, [getMessageOffset]);

  const renderItem = useCallback(({ item }: { item: Message }) => (
    <View onLayout={(e) => onLayout(item.id, e)}>
      <MessageBubble
        message={item}
        isSent={item.senderId === userId}
        onClick={selectMessageToReply}
        scrollToMessage={scrollToMessage}
      />
    </View>
  ), [userId, selectMessageToReply, onLayout]);

  
  return {
    userId,
    chat,
    messages,
    renderItem,
    flatListRef,

  };
};
