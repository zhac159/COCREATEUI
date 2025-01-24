import { FC } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Theme } from "@react-navigation/native";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import { Message } from "@/common/types/Message";

type ReplyingMessageCoverProps = {
  replyingMessage: Message | null;
  onClick: () => void;
};

export const ReplyingMessageCover: FC<ReplyingMessageCoverProps> = ({
  onClick,
  replyingMessage,
}) => {
  const styles = useThemedStyles(getStyles);

  if (!replyingMessage) return null;

  return <TouchableOpacity style={styles.container} onPress={onClick} />;
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.black,
      position: "absolute",
      opacity: 0.3,
      bottom: 0,
      right: 0,
      top: 0,
      left: 0,
    },
  });
