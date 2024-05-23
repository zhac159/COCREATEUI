import Message from "../Common/Messages/Message";
import { Pressable, Text, StyleSheet } from "react-native";
import { useTheme } from "../Themes/theme";
import { FC, memo, useCallback } from "react";


type MessageBubbleProps = {
  item: Message;
  userId: number;
  onPress: (message: Message) => void;
};

const MessageBubble: FC<MessageBubbleProps> = memo(
  ({ item, userId, onPress }) => {
    const theme = useTheme();

    return (
      <Pressable
        style={{
          ...styles.messageContainer,
          alignSelf: item.senderId === userId ? "flex-end" : "flex-start",
          backgroundColor:
            item.senderId === userId
              ? theme.colors.primary
              : theme.colors.lightGray,
        }}
        onPress={() => onPress(item)}
      >
        <Text
          style={{
            color:
              item.senderId === userId
                ? theme.colors.white
                : theme.colors.black,
          }}
        >
          {item.content}
        </Text>
        {item.replyMessage && (
          <Text
            style={{
              color:
                item.senderId === userId
                  ? theme.colors.white
                  : theme.colors.black,
            }}
          >
            {item.replyMessage.content}
          </Text>
        )}
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    messageContainer: {
      paddingHorizontal: 17,
      paddingVertical: 7,
      borderRadius: 17,
    },
    inputContainer: {
      padding: 10,
      backgroundColor: "white",
    },
    input: {
      height: 40,
      borderColor: "gray",
      borderWidth: 1,
      borderRadius: 10,
      paddingLeft: 10,
    },
  });

export const useRenderChatMessage = (
  userId: number,
  onPress: (message: Message) => void
) => {
  return useCallback(
    ({ item }: { item: Message }) => (
      <MessageBubble item={item} userId={userId} onPress={onPress} />
    ),
    [userId]
  );
};
