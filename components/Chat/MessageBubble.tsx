import React, { FC, memo, useMemo, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { Theme } from "@react-navigation/native";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import { Message } from "@/common/types/Message";
import StyledText from "@/common/components/StyledComponents/StyledText";
import { format } from "date-fns";
import { useMessageBubbleHelpers } from "./hooks/useMessageBubbleHelpers";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { MessageReplyBubble } from "./MessageReplyBubble";
import { useChat } from "@/common/contexts/ChatProvider";

type MessageBubbleProps = {
  message: Message;
  isSent: boolean;
  onClick: (message: Message) => void;
  scrollToMessage: (message: Message) => void;
};

const MessageBubbleComponent: FC<MessageBubbleProps> = ({
  message,
  isSent,
  scrollToMessage,
  onClick,
}) => {
  const { shouldDateMoveDown } = useMessageBubbleHelpers();
  const moveDateDown = useMemo(() => shouldDateMoveDown(message), [message]);
  const styles = useThemedStyles((theme) =>
    getStyles(theme, isSent, moveDateDown, !!message.replyMessage)
  );

  const handlePress = useCallback(() => onClick(message), [message, onClick]);
  const formattedDate = useMemo(
    () => format(new Date(message.date), "HH:mm"),
    [message.date]
  );

  return (
    <View style={styles.container}>
      {message.replyMessage && (
        <MessageReplyBubble
          replyMessage={message.replyMessage}
          scrollToMessage={scrollToMessage}
        />
      )}
      <TouchableWithoutFeedback
        containerStyle={styles.message}
        style={styles.buttonStyle}
        onPress={handlePress}
      >
        <StyledText
          style={styles.messageStyle}
          text={message.content || ""}
          numberOfLines={100}
        />
        <StyledText style={styles.dateStyle} text={formattedDate} />
      </TouchableWithoutFeedback>
    </View>
  );
};

const areEqual = (
  prevProps: MessageBubbleProps,
  nextProps: MessageBubbleProps
) => {
  return (
    prevProps.message.id === nextProps.message.id &&
    prevProps.isSent === nextProps.isSent &&
    prevProps.message.content === nextProps.message.content &&
    prevProps.message.date === nextProps.message.date &&
    prevProps.message.replyMessage?.content ===
      nextProps.message.replyMessage?.content
  );
};

export default memo(MessageBubbleComponent, areEqual);

const getStyles = (
  theme: Theme,
  isSent: boolean,
  moveDateDown: boolean,
  hasReply?: boolean
) =>
  StyleSheet.create({
    buttonStyle: {
      flexDirection: moveDateDown ? "column" : "row",
      justifyContent: "space-between",
    },
    container: {
      alignSelf: isSent ? "flex-end" : "flex-start",
      maxWidth: "80%",
      marginTop: 10,
      elevation: 1,
    },
    message: {
      backgroundColor: isSent ? theme.colors.primary : theme.colors.white,
      justifyContent: "space-between",
      paddingLeft: 20,
      paddingVertical: 8,
      paddingRight: 25,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      borderTopLeftRadius: hasReply ? 0 : 20,
      borderTopRightRadius: hasReply ? 0 : 20,
    },
    messageStyle: {
      color: isSent ? theme.colors.white : theme.colors.black,
      lineHeight: 20,
      fontWeight: "400",
      fontSize: 18,
    },
    dateStyle: {
      alignSelf: "flex-end",
      marginRight: 8,
      fontWeight: "400",
      marginLeft: 8,
      color: isSent ? theme.colors.white : theme.colors.black,
      fontSize: 10,
    },
  });
