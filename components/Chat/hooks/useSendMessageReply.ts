import { Message } from "@/common/types/Message";
import { useRef, useState } from "react";
import { Keyboard, TextInput } from "react-native";

export const useSendMessageReply = () => {
  const chatTextInputRef = useRef<TextInput>(null);
  const [replyingMessage, setReplyingMessage] = useState<Message | null>(null);

  const selectMessageToReply = (message: Message) => {
    if (!Keyboard.isVisible()) {
      setReplyingMessage(message);
      chatTextInputRef.current?.focus();
    }
  };

  const dismissReplyingMessage = () => {
    setReplyingMessage(null);
    chatTextInputRef.current?.blur();
  };

  return {
    chatTextInputRef,
    replyingMessage,
    selectMessageToReply,
    dismissReplyingMessage,
  };
};
