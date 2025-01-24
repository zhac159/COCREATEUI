import { forwardRef, ForwardRefRenderFunction, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Theme } from "@react-navigation/native";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import { generalPadding } from "@/common/constants/generalPadding";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSendMessage } from "./hooks/useSendMessage";
import { Message } from "@/common/types/Message";
import { ChatInputButton } from "./ChatInputButton";
import MessageBubble from "./MessageBubble";

type ChatInputProps = {
  replyingMessage: Message | null;
};

const ChatInputComponent: ForwardRefRenderFunction<
  TextInput,
  ChatInputProps
> = ({ replyingMessage }, ref) => {
  const { bottom } = useSafeAreaInsets();
  const styles = useThemedStyles((theme) => getStyles(theme, bottom));

  const [message, setMessage] = useState("");

  const sendMessage = useSendMessage();

  const handleSendMessage = () => {
    sendMessage(message, replyingMessage);
    setMessage("");
  };

  return (
    <>
      {replyingMessage && (
        <View>
          <MessageBubble
            message={replyingMessage}
            isSent={false}
            onClick={() => {}}
          />
        </View>
      )}
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          value={message}
          onChangeText={setMessage}
          ref={ref}
        />
        <ChatInputButton sendMessage={handleSendMessage} hasText={!!message} />
      </View>
    </>
  );
};

export const ChatInput = forwardRef(ChatInputComponent);

const getStyles = (theme: Theme, bottomAreaSafePadding: number) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: "white",
      alignItems: "center",
      paddingTop: 10,
      paddingBottom: bottomAreaSafePadding,
      borderTopWidth: 0.3,
      paddingHorizontal: generalPadding,
    },
    textInput: {
      ...theme.customFonts.primary,
      width: "85%",
      paddingHorizontal: generalPadding,
      backgroundColor: theme.colors.backgroundColor,
      borderRadius: 25,
      height: 40,
    },
  });
