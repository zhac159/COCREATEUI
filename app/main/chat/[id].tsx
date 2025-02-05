import { StyledBackgroundAnimation } from "@/common/components/BackgroundAnimation";
import { ChatInput } from "@/components/Chat/ChatInput";
import { ChatMessageList } from "@/components/Chat/ChatMessageList";
import {
  chatAnimatedStyles,
  useChatAnimatedStyles,
} from "@/components/Chat/hooks/useChatAnimatedStyles";
import { useSendMessageReply } from "@/components/Chat/hooks/useSendMessageReply";
import { useRef } from "react";
import { Message } from "@/common/types/Message";
import { FlatList } from "react-native";
import { KeyboardGestureArea } from "react-native-keyboard-controller";
import Animated from "react-native-reanimated";

export default function ChatScreen() {
  const { scrollViewStyle, textInputStyle } = useChatAnimatedStyles();

  const chatListRef = useRef<FlatList<Message>>(null);

  const { chatTextInputRef, selectMessageToReply, replyingMessage } =
    useSendMessageReply();

  return (
    <KeyboardGestureArea
      offset={100}
      style={chatAnimatedStyles.container}
      interpolator="ios"
    >
      <StyledBackgroundAnimation />
      <ChatMessageList
        ref={chatListRef}
        style={scrollViewStyle}
        selectMessageToReply={selectMessageToReply}
      />
      <Animated.View style={textInputStyle}>
        <ChatInput ref={chatTextInputRef} replyingMessage={replyingMessage} />
      </Animated.View>
    </KeyboardGestureArea>
  );
}