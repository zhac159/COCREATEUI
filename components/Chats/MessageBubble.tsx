import Message from "../Common/Messages/Message";
import { Pressable, Text, StyleSheet, View } from "react-native";
import { useTheme } from "../Themes/theme";
import { FC, memo, useCallback, useMemo } from "react";
import MessageReactions from "./MessageReactions";
import Media from "../MediaViewer/Media";

type MessageBubbleProps = {
  item: Message;
  userId: number;
  onPress: (message: Message) => void;
  showReactions: boolean;
  userIdUsernameMap: Record<number, string>;
  showName?: boolean;
};

type ReplyMessageBubbleProps = {
  item: Message;
  userId: number;
  onPress: (message: Message) => void;
  onPressReply: (message: Message) => void;
  showReactions: boolean;
  userIdUsernameMap: Record<number, string>;
  showName?: boolean;
};

const MessageBubble: FC<MessageBubbleProps> = memo(
  ({ item, userId, onPress, showReactions, userIdUsernameMap, showName }) => {
    const theme = useTheme();
    
    const isCurrentUserSender = useMemo(
      () => item.senderId === userId,
      [item.senderId, userId]
    );

    return (
      <View
        style={{
          flexDirection: "row",
          alignSelf: isCurrentUserSender ? "flex-end" : "flex-start",
          gap: 5,
        }}
      >
        {showReactions && isCurrentUserSender && item.reactions && (
          <MessageReactions reactions={item.reactions} />
        )}
        <View
          style={{
            gap: 5,
          }}
        >
          {item.uri && (
            <Media
              style={{
                width: 200,
                height: 200,
                borderRadius: 10,
                pointerEvents: "box-only",
              }}
              uri={item.uri}
            />
          )}
          {item.content && (
            <Pressable
              style={{
                ...styles.messageContainer,
                gap: 5,
                alignSelf: isCurrentUserSender ? "flex-end" : "flex-start",
                backgroundColor: isCurrentUserSender
                  ? theme.colors.primary
                  : theme.colors.lightGray,
              }}
              onPress={() => onPress(item)}
            >
              {showName && (
                <Text
                  style={{
                    ...theme.customFonts.primary.small,
                    color: isCurrentUserSender
                      ? theme.colors.lightGray
                      : theme.colors.black,
                    alignSelf: "flex-start",
                    fontSize: 14,
                  }}
                >
                  {userIdUsernameMap[item.senderId]}
                </Text>
              )}
              <Text
                style={{
                  ...theme.customFonts.primary.medium,
                  fontWeight: "400",
                  fontSize: 17,
                  color: isCurrentUserSender
                    ? theme.colors.white
                    : theme.colors.black,
                }}
              >
                {item.content}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  alignSelf: "flex-end",
                  color:
                    item.senderId === userId
                      ? theme.colors.white
                      : theme.colors.black,
                }}
              >
                {new Date(item.date!).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </Text>
            </Pressable>
          )}
        </View>
        {showReactions && !isCurrentUserSender && item.reactions && (
          <MessageReactions reactions={item.reactions} />
        )}
      </View>
    );
  }
);

const ReplyMessageBubble: FC<ReplyMessageBubbleProps> = memo(
  ({
    item,
    userId,
    onPress,
    onPressReply,
    showReactions,
    userIdUsernameMap,
    showName,
  }) => {
    const theme = useTheme();

    const isCurrentUserSender = useMemo(
      () => item.senderId === userId,
      [item.senderId, userId]
    );

    const isReplyMessageSenderCurrentUser = useMemo(
      () => item.replyMessage!.senderId === userId,
      [item.replyMessage, userId]
    );

    return (
      <View
        style={{
          flexDirection: "row",
          alignSelf: isCurrentUserSender ? "flex-end" : "flex-start",
          gap: 5,
        }}
      >
        {showReactions && isCurrentUserSender && item.reactions && (
          <MessageReactions reactions={item.reactions} />
        )}
        <View>
          <Pressable
            style={{
              ...styles.replyMessageContainers,
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              borderColor: theme.colors.gray,
              backgroundColor: theme.colors.lightestGray,
              borderWidth: 1,
              borderBottomWidth: 0,
            }}
            onPress={() => onPressReply(item.replyMessage!)}
          >
            <Text
              style={{
                ...theme.customFonts.primary.small,
                alignSelf: "flex-start",
                fontSize: 16,
              }}
            >
              {userIdUsernameMap[item.replyMessage!.senderId!]}
            </Text>
            <Text
              style={{
                ...theme.customFonts.primary.medium,
                fontWeight: "400",
                fontSize: 17,
                color: theme.colors.black,
              }}
            >
              {item.replyMessage!.content}
            </Text>
          </Pressable>
          <Pressable
            style={{
              ...styles.replyMessageContainers,
              gap: 5,
              backgroundColor: isCurrentUserSender
                ? theme.colors.primary
                : theme.colors.lightGray,
              borderBottomLeftRadius: 12,
              borderBottomRightRadius: 12,
            }}
            onPress={() => onPress(item)}
          >
            {showName && (
              <Text
                style={{
                  ...theme.customFonts.primary.small,
                  color: theme.colors.lightGray,
                  alignSelf: "flex-start",
                  fontSize: 16,
                }}
              >
                {userIdUsernameMap[item.senderId!]}
              </Text>
            )}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  ...theme.customFonts.primary.medium,
                  fontWeight: "400",
                  fontSize: 17,
                  color: isCurrentUserSender
                    ? theme.colors.white
                    : theme.colors.black,
                }}
              >
                {item.content}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  alignSelf: "flex-end",
                  color: isCurrentUserSender
                    ? theme.colors.white
                    : theme.colors.black,
                }}
              >
                {new Date(item.date!).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </Text>
            </View>
          </Pressable>
        </View>
        {showReactions && !isCurrentUserSender && item.reactions && (
          <MessageReactions reactions={item.reactions} />
        )}
      </View>
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
  replyMessageContainers: {
    paddingHorizontal: 17,
    paddingVertical: 7,
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
  onPress: (message: Message) => void,
  handleSelectMessageReply: (message: Message) => void,
  userIdUsernameMap: Record<number, string>,
  showName: boolean
) => {
  return useCallback(
    ({
      item,
      showReactions = true,
    }: {
      item: Message;
      showReactions: boolean;
    }) => {
      if (item.replyMessageId) {
        return (
          <ReplyMessageBubble
            item={item}
            userId={userId}
            onPress={onPress}
            onPressReply={handleSelectMessageReply}
            showReactions={showReactions}
            userIdUsernameMap={userIdUsernameMap}
            showName={showName}
          />
        );
      }
      return (
        <MessageBubble
          item={item}
          userId={userId}
          onPress={onPress}
          showReactions={showReactions}
          userIdUsernameMap={userIdUsernameMap}
          showName={showName}
        />
      );
    },
    [userId]
  );
};
