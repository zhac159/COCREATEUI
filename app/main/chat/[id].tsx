import { ScrollViewWrapper } from "@/common/components/ScrollViewWrapper";
import { useChat } from "@/common/contexts/ChatProvider";
import { ChatInput } from "@/components/Chat/ChatInput";
import { Theme } from "@react-navigation/native";
import { StyleSheet, TextInput } from "react-native";
import { View } from "react-native";

export default function Index() {
  const { chat, symmetricKey } = useChat();

  return (
    <ScrollViewWrapper contentContainerStyle={styles.container}>
      <ChatInput />
    </ScrollViewWrapper>
  );
}

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "transparent",
    },
  });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    // justifyContent: "flex-end",
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  row: {
    flexDirection: "row",
  },
});
