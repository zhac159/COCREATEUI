import React from "react";
import { IconButton } from "react-native-paper";
import { useTheme } from "../Themes/theme";
import { MessageCreateDTO, MessageDTO } from "@/common/api/model";
import { View, Text, StyleSheet } from "react-native";

type ChatReactionMessageProps = {
  message?: MessageDTO;
  onSendMessage: (message: MessageCreateDTO) => void;
  renderItem: ({ item }: { item: MessageDTO }) => React.JSX.Element;
};

const ChatReactionMessage: React.FC<ChatReactionMessageProps> = ({
  message,
  onSendMessage,
  renderItem,
}) => {
  const theme = useTheme();

  const lastEmojis = ["👍", "👎", "👌", "👏", "👀"];

  if (!message) return null;

  return (
    <View>
      <View
        style={{
          position: "absolute",
          width: "100%",
          bottom: "100%",
          paddingHorizontal: 16,
          paddingBottom: 20,
          gap: 20,
          alignItems: "flex-start",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 5,
          }}
        >
          {lastEmojis.map((emoji) => (
            <IconButton
              key={emoji}
              icon={() => (
                <Text
                  style={{
                    fontSize: 20,
                  }}
                >
                  {emoji}
                </Text>
              )}
              size={20}
            />
          ))}
        </View>
        <View
          style={{
            alignSelf: "flex-start",
          }}
        >
          {renderItem({ item: message })}
        </View>
      </View>
    </View>
  );
};

export default ChatReactionMessage;

const styles = StyleSheet.create({
  inputContainer: {
    paddingBottom: 30,
    paddingTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
});
