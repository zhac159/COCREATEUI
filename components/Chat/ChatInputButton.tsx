import { FC } from "react";
import { StyleSheet } from "react-native";
import { Theme } from "@react-navigation/native";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import StyledIconButton from "@/common/components/StyledComponents/StyledIconButton";

type ChatInputButtonProps = {
  sendMessage: () => void;
  hasText: boolean;
};

export const ChatInputButton: FC<ChatInputButtonProps> = ({
  hasText,
  sendMessage,
}) => {
  const styles = useThemedStyles(getStyles);

  const onClick = () => {
    if (hasText) {
      sendMessage();
    } else {
      // Do nothing
    }
  };
  
  return (
    <StyledIconButton
      iconName={hasText ? "arrow-up" : "plus"}
      style={styles.iconStyle}
      onPress={onClick}
    />
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    iconStyle: {
      backgroundColor: theme.colors.black,
      fontSize: 15,
      height: 30,
    },
  });
