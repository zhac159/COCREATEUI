import { StyledBackgroundAnimation } from "@/common/components/BackgroundAnimation";
import { useChat } from "@/common/contexts/ChatProvider";
import { useDatabase } from "@/common/hooks/database/useDatabase";
import { useAuthStore } from "@/common/stores/authStore/authStore";
import { useMessagesStore } from "@/common/stores/messagesStore";
import { ChatInput } from "@/components/Chat/ChatInput";
import {
  chatAnimatedStyles,
  useChatAnimatedStyles,
} from "@/components/Chat/hooks/useChatAnimatedStyles";
import { useSendMessageReply } from "@/components/Chat/hooks/useSendMessageReply";
import MessageBubble from "@/components/Chat/MessageBubble";
import { useState } from "react";
import { NativeScrollEvent, NativeSyntheticEvent, View } from "react-native";
import { KeyboardGestureArea } from "react-native-keyboard-controller";
import Animated from "react-native-reanimated";

export default function Index() {
  const { scrollViewStyle, textInputStyle } = useChatAnimatedStyles();
  const userId = useAuthStore((state) => state.auth.userId);

  const { chat } = useChat();
  const messages = useMessagesStore((state) => state.getChatMessages(chat.id));
  const addMessages = useMessagesStore((state) => state.addMessages);
  const [loadingMore, setLoadingMore] = useState(false);

  const { getDbMessagesBefore } = useDatabase();

  const { chatTextInputRef, selectMessageToReply, replyingMessage } =
    useSendMessageReply();

  const handleScroll = async (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const isAtBottom =
      contentOffset.y + layoutMeasurement.height >= contentSize.height - 500;

      console.log(isAtBottom);

    if (isAtBottom && !loadingMore) {
      setLoadingMore(true);
      try {
        const oldMessages = await getDbMessagesBefore(chat.id, messages[0]);
        addMessages(oldMessages, true);
      } finally {
        setLoadingMore(false);
      }
    }
  };

  return (
    <KeyboardGestureArea
      offset={100}
      style={chatAnimatedStyles.container}
      nativeID="chat-input"
      interpolator={"ios"}
    >
      <StyledBackgroundAnimation />
      <Animated.ScrollView
        onScroll={handleScroll}
        style={scrollViewStyle}
        contentInsetAdjustmentBehavior="never"
        keyboardDismissMode="interactive"
        scrollEnabled={!loadingMore} // Disable scrolling while loading
        testID="chat.scroll"
      >
        <View style={chatAnimatedStyles.inverted}>
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              isSent={message.senderId === userId}
              onClick={selectMessageToReply}
            />
          ))}
        </View>
      </Animated.ScrollView>
      <Animated.View style={textInputStyle}>
        <ChatInput ref={chatTextInputRef} replyingMessage={replyingMessage} />
      </Animated.View>
    </KeyboardGestureArea>
  );
}
