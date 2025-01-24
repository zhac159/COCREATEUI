import { FC } from "react";
import { StyleSheet } from "react-native";
import { Theme } from "@react-navigation/native";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import { Message } from "@/common/types/Message";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import StyledText from "@/common/components/StyledComponents/StyledText";
import { useChat } from "@/common/contexts/ChatProvider";

type MessageReplyBubbleProps = {
  replyMessage: Message;
  scrollToMessage: (message: Message) => void;
};

export const MessageReplyBubble: FC<MessageReplyBubbleProps> = ({
  replyMessage,
  scrollToMessage,
}) => {
  const styles = useThemedStyles(getStyles);

  const { userIdToMember } = useChat();

  return (
    <TouchableWithoutFeedback
      containerStyle={styles.container}
      style={styles.buttonStyle}
      onPress={() => scrollToMessage(replyMessage)}
    >
      <StyledText
        style={styles.userName}
        text={userIdToMember.get(replyMessage.senderId)?.userName}
      />
      <StyledText
        style={styles.messageStyle}
        text={replyMessage.content}
        numberOfLines={100}
      />
    </TouchableWithoutFeedback>
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    buttonStyle: {
      justifyContent: "space-between",
      gap: 5,
    },
    container: {
      backgroundColor: theme.colors.lightGray,
      paddingVertical: 8,
      paddingLeft: 20,
      paddingRight: 25,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      marginTop: 10,
      elevation: 1,
    },
    userName: {
      fontSize: 10,
      fontWeight: "700",
    },
    messageStyle: {
      lineHeight: 20,
      fontWeight: "400",
      fontSize: 18,
    },
    dateStyle: {
      alignSelf: "flex-end",
      fontWeight: "400",
      marginLeft: 8,
      fontSize: 10,
    },
  });
