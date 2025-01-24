import { FC, memo } from "react";
import { StyleSheet, View } from "react-native";
import { Theme } from "@react-navigation/native";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import { Message } from "@/common/types/Message";
import StyledText from "@/common/components/StyledComponents/StyledText";
import { format } from "date-fns";
import { useMessageBubbleHelpers } from "./hooks/useMessageBubbleHelpers";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

type MessageBubbleProps = {
  message: Message;
  isSent: boolean;
  onClick: (message: Message) => void;
};

const MessageBubble: FC<MessageBubbleProps> = ({
  message,
  isSent,
  onClick,
}) => {
  const { shouldDateMoveDown } = useMessageBubbleHelpers();
  const styles = useThemedStyles((theme) =>
    getStyles(theme, isSent, shouldDateMoveDown(message))
  );

  return (
    <TouchableWithoutFeedback
      containerStyle={styles.container}
      style={styles.buttonStyle}
      onPress={() => onClick(message)}
    >
      <StyledText
        style={{...styles.messageStyle, color: "red"}}
        text={message?.replyMessage?.content || ""}
        numberOfLines={100}
      />
      <StyledText
        style={styles.messageStyle}
        text={message.content || ""}
        numberOfLines={100}
      />
      <StyledText
        style={styles.dateStyle}
        text={format(new Date(message.date), "HH:mm")}
      />
    </TouchableWithoutFeedback>
  );
};

export default memo(MessageBubble);


const getStyles = (theme: Theme, isSent: boolean, moveDateDown: boolean) =>
  StyleSheet.create({
    buttonStyle: {
      flexDirection: moveDateDown ? "column" : "row",
      justifyContent: "space-between",
      width: "100%",
      maxWidth: "80%",
    },
    container: {
      alignSelf: isSent ? "flex-end" : "flex-start",
      backgroundColor: isSent ? theme.colors.primary : theme.colors.white,
      paddingVertical: 6,
      paddingLeft: 17,
      paddingRight: 23,
      borderRadius: 20,
      marginTop: 10,
      elevation: 1,
    },
    messageStyle: {
      color: isSent ? theme.colors.white : theme.colors.black,
      lineHeight: 20,
      maxWidth: "80%",
      fontWeight: "400",
      fontSize: 18,
    },
    dateStyle: {
      alignSelf: "flex-end",
      fontWeight: "400",
      marginLeft: 8,
      color: isSent ? theme.colors.white : theme.colors.black,
      fontSize: 10,
    },
  });
