import { FC, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Theme } from "@react-navigation/native";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import { generalPadding } from "@/common/constants/generalPadding";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSendMessage } from "./hooks/useSendMessage";
import StyledIconButton from "@/common/components/StyledComponents/StyledIconButton";

type ChatInputProps = {};

export const ChatInput: FC<ChatInputProps> = ({}) => {
  const { bottom } = useSafeAreaInsets();
  const styles = useThemedStyles((theme) => getStyles(theme, bottom));

  const [message, setMessage] = useState("");

  const sendMessage = useSendMessage();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Type a message..."
        value={message}
        onChangeText={setMessage}
        onSubmitEditing={() => {
          sendMessage(message);
          setMessage("");
        }}
      />
      <StyledIconButton
        iconName="arrow-right"
        onPress={() => {
          sendMessage(message);
          setMessage("");
        }}
      />
    </View>
  );
};

const getStyles = (theme: Theme, bottomAreaSafePadding: number) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: "white",
      alignItems: "center",
      paddingTop: 10,
      paddingBottom: bottomAreaSafePadding + 10,
      borderTopWidth: 0.3,
      paddingHorizontal: generalPadding,
    },
    textInput: {
      ...theme.customFonts.primary,
      width: "90%",
      paddingHorizontal: generalPadding,
      backgroundColor: theme.colors.backgroundColor,
      borderRadius: 25,
      height: 30,
    },
  });
