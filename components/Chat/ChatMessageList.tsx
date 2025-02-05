import { generalPadding } from "@/common/constants/generalPadding";
import { Message } from "@/common/types/Message";
import { forwardRef, useEffect } from "react";
import { FlatList, StyleProp, ViewStyle } from "react-native";
import Animated, { AnimatedStyle } from "react-native-reanimated";
import { useChatMessageList } from "./hooks/useChatMessageList";

type ChatMessageListProps = {
  style: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
  selectMessageToReply: (message: Message) => void;
};

export const ChatMessageList = forwardRef<
  FlatList<Message>,
  ChatMessageListProps
>(({ style, selectMessageToReply }, ref) => {
  const { messages, handleLoadMore, renderItem } = useChatMessageList(
    selectMessageToReply,
    () => {}
  );

  // scroll to top
  const scrollToTop = () => {
    if (ref && "current" in ref) {
      ref.current?.scrollToEnd({
        animated: true,
      });
    }
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <Animated.FlatList
      inverted
      ref={ref}
      data={messages}
      contentContainerStyle={{ paddingHorizontal: generalPadding }}
      disableVirtualization
      style={style}
      windowSize={30}
      initialNumToRender={20}
      maxToRenderPerBatch={30}
      updateCellsBatchingPeriod={20}
      onEndReachedThreshold={0.5}
      onEndReached={async () => {
        await handleLoadMore();
      }}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
});
