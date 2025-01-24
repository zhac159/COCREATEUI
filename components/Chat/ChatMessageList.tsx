import { generalPadding } from "@/common/constants/generalPadding";
import { Message } from "@/common/types/Message";
import { FC, useRef } from "react";
import { StyleProp, ViewStyle } from "react-native";
import Animated, { AnimatedStyle } from "react-native-reanimated";
import { useChatMessageList } from "./hooks/useChatMessageList";

type ChatMessageListProps = {
  style: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
  selectMessageToReply: (message: Message) => void;
};

export const ChatMessageList: FC<ChatMessageListProps> = ({
  style,
  selectMessageToReply,
}) => {
  const flatListRef = useRef<Animated.FlatList<Message>>(null);

  const { messages, renderItem } =
    useChatMessageList(selectMessageToReply, flatListRef);

  return (
    <Animated.FlatList
      inverted
      ref={flatListRef}
      data={messages}
      contentContainerStyle={{ paddingHorizontal: generalPadding }}
      disableVirtualization
      style={style}
      windowSize={30}
      initialNumToRender={20}
      maxToRenderPerBatch={30}
      getItemLayout={(data, index) => ({
        length: 100, // Approximate height of each message
        offset: 100 * index,
        index,
      })}
      updateCellsBatchingPeriod={20}
      onEndReachedThreshold={0.5}
      // onEndReached={async () => {
      //   await handleLoadMore();
      // }}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
};
