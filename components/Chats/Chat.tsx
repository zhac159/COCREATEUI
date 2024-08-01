import { MessageCreateDTO } from "@/common/api/model";
import React, { FC, useState, useRef, useCallback } from "react";
import {
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import ChatTextInput from "./ChatTextInput";
import Message from "../Common/Messages/Message";
import { useRenderChatMessage } from "./MessageBubble";
import MessageReaction from "../Common/Messages/MessageReaction";
import { BlurView } from "expo-blur";

type ChatProps = {
  messages: Message[];
  userIdUsernameMap: Record<number, string>;
  handleLoadMessages: () => void;
  handleLoadLaterMessages: () => void;
  handleSendMessage: (message: MessageCreateDTO) => void;
  handleLoadMessagesAroundMessage: (message: Message) => void;
  handleAddReaction: (message: MessageReaction) => void;
  userId: number;
  getMedia: (index: number) => void;
  showNames?: boolean;
};

const Chat: FC<ChatProps> = ({
  messages,
  userIdUsernameMap,
  handleLoadMessages,
  handleLoadLaterMessages,
  handleSendMessage,
  handleLoadMessagesAroundMessage,
  handleAddReaction,
  userId,
  getMedia,
  showNames,
}) => {
  const flatListRef = useRef<FlatList<Message>>(null);

  const [
    onStartReachedCalledDuringMomentum,
    setOnStartReachedCalledDuringMomentum,
  ] = useState(false);

  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(false);

  const [selectedMessage, setSelectedMessage] = useState<Message>();

  const textInputRef = useRef<TextInput | null>(null);

  const handleSelectMessage = (message: Message) => {
    setSelectedMessage(message);
    textInputRef.current?.focus();
  };

  const handleSelectReplyMessage = (message: Message) => {
    handleLoadMessagesAroundMessage(message);
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({
        index: 14,
        animated: true,
      });
    }, 200);
  };

  const renderItem = useRenderChatMessage(
    userId,
    handleSelectMessage,
    handleSelectReplyMessage,
    userIdUsernameMap,
    !!showNames
  );

  const handleAddReactionAndClose = useCallback(
    async (messageReaction: MessageReaction) => {
      await handleAddReaction(messageReaction);
      textInputRef.current?.blur();
      setSelectedMessage(undefined);
    },
    [handleAddReaction]
  );

  const handleRenderItem = ({ item }: { item: Message }) => {
    return renderItem({ item, showReactions: true });
  };

  const handleSendMessageAndScroll = (message: MessageCreateDTO) => {
    handleSendMessage(message);
    setTimeout(() => {
      if (flatListRef.current && messages.length > 0) {
        flatListRef.current.scrollToIndex({ animated: true, index: 0 });
      }
    }, 100);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <FlatList
        ref={flatListRef}
        contentContainerStyle={styles.fltListContainer}
        data={messages}
        inverted
        showsVerticalScrollIndicator={false}
        renderItem={handleRenderItem}
        keyExtractor={(item) => item.id!.toString()}
        scrollsToTop={false}
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
        }}
        onEndReached={() => {
          if (!onEndReachedCalledDuringMomentum) {
            handleLoadMessages();
            setOnEndReachedCalledDuringMomentum(true);
          }
        }}
        onStartReached={() => {
          if (!onStartReachedCalledDuringMomentum) {
            handleLoadLaterMessages();
            setOnStartReachedCalledDuringMomentum(true);
          }
        }}
        onMomentumScrollBegin={() => {
          setOnStartReachedCalledDuringMomentum(false);
          setOnEndReachedCalledDuringMomentum(false);
        }}
        initialNumToRender={15}
        maxToRenderPerBatch={25}
        updateCellsBatchingPeriod={40}
      />
      {selectedMessage && (
        <TouchableOpacity
          activeOpacity={1}
          style={StyleSheet.absoluteFill}
          onPress={() => {
            setSelectedMessage(undefined), Keyboard.dismiss();
          }}
        >
          <BlurView
            style={StyleSheet.absoluteFill}
            tint="dark"
            intensity={10}
          />
        </TouchableOpacity>
      )}
      <ChatTextInput
        ref={textInputRef}
        renderItem={renderItem}
        selectedMessage={selectedMessage}
        setSelectedMessage={setSelectedMessage}
        sendMessage={handleSendMessageAndScroll}
        addReaction={handleAddReactionAndClose}
        getMedia={getMedia}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fltListContainer: {
    paddingHorizontal: 15,
    gap: 15,
    paddingBottom: 160,
    paddingTop: 20,
  },
  messageContainer: {
    flexDirection: "row",
    padding: 10,
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

export default Chat;
