import { MessageCreateDTO, MessageDTO } from "@/common/api/model";
import React, { FC, useState, useEffect, useRef } from "react";
import {
  FlatList,
  TextInput,
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import BackgroundColourAnimation from "../Account/BackgroundColourAnimation";
import ChatTextInput from "./ChatTextInput";
import { BlurView } from "@react-native-community/blur";
import Message from "../Common/Messages/Message";
import { useRenderChatMessage } from "./ChatBubble";

type ChatProps = {
  messages: Message[];
  handleLoadMessages: () => void;
  handleSendMessage: (message: MessageCreateDTO) => void;
  userId: number;
};

const Chat: FC<ChatProps> = ({
  messages,
  handleLoadMessages,
  handleSendMessage,
  userId,
}) => {
  const flatListRef = useRef<FlatList<Message>>(null);

  const [selectedMessage, setSelectedMessage] = useState<Message>();

  const textInputRef = useRef<TextInput | null>(null);

  const handleSelectMessage = (message: Message) => {
    setSelectedMessage(message);
    textInputRef.current?.focus();
  };

  const renderItem = useRenderChatMessage(userId, handleSelectMessage);

  return (
    <View style={styles.container}>
      <BackgroundColourAnimation />
      <FlatList
        showsVerticalScrollIndicator={false}
        ref={flatListRef}
        contentContainerStyle={{
          paddingHorizontal: 15,
          gap: 15,
          paddingBottom: 160,
          paddingTop: 20,
        }}
        data={messages}
        inverted
        renderItem={renderItem}
        keyExtractor={(item) => item.id!.toString()}
        // onContentSizeChange={() =>
        //   flatListRef.current?.scrollToOffset({ offset: 0, animated: false })
        // }
        scrollsToTop={false}
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
        }}
        onEndReached={handleLoadMessages}
        initialNumToRender={15}
        onEndReachedThreshold={0.5}
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
            blurType="dark"
            blurAmount={10}
          />
        </TouchableOpacity>
      )}
      <ChatTextInput
        ref={textInputRef}
        renderItem={renderItem}
        selectedMessage={selectedMessage}
        sendMessage={handleSendMessage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
