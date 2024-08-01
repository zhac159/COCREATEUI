import { FontAwesome6 } from "@expo/vector-icons";
import React, { useState } from "react";
import { TextInput, View, StyleSheet, Text } from "react-native";
import { IconButton } from "react-native-paper";
import { useTheme } from "../Themes/theme";
import { MessageCreateDTO, MessageDTO } from "@/common/api/model";
import ChatReactionMessage from "./ChatReactionMessage";
import Message from "../Common/Messages/Message";
import MessageReaction from "../Common/Messages/MessageReaction";

type ChatTextInputProps = {
  sendMessage: (message: MessageCreateDTO) => void;
  renderItem: ({
    item,
    showReactions,
  }: {
    item: Message;
    showReactions: boolean;
  }) => React.JSX.Element;
  selectedMessage?: Message;
  setSelectedMessage: React.Dispatch<React.SetStateAction<Message | undefined>>;
  addReaction: (message: MessageReaction) => void;
  getMedia: (index: number) => void;
};

const ChatTextInput: React.ForwardRefRenderFunction<
  TextInput,
  ChatTextInputProps
> = (
  {
    sendMessage,
    selectedMessage,
    renderItem,
    setSelectedMessage,
    addReaction,
    getMedia,
  },
  ref
) => {
  const [text, setText] = useState("");

  const theme = useTheme();

  const handleSend = () => {
    
    const message: MessageCreateDTO = {
      content: text,
      replyMessageId: selectedMessage ? selectedMessage?.id : null,
    };

    sendMessage(message);
    setSelectedMessage(undefined);
    setText("");
  };

  return (
    <View>
      <ChatReactionMessage
        message={selectedMessage}
        onSendMessage={sendMessage}
        renderItem={renderItem}
        addReaction={addReaction}
      />
      <View style={styles.inputContainer}>
        <TextInput
          ref={ref}
          style={{
            ...theme.customFonts.primary.small,
            ...styles.input,
            fontSize: 17,
            backgroundColor: theme.colors.lightGray,
          }}
          blurOnSubmit={false}
          value={text}
          onChangeText={setText}
          onSubmitEditing={handleSend}
        />
        <IconButton
          icon={() => (
            <FontAwesome6
              name={text !== "" ? "arrow-up" : "plus"}
              size={18}
              solid
              color={theme.colors.white}
            />
          )}
          onPress={() => {
            if (text !== "") {
              handleSend();
            }
            else{
              getMedia(0);
            }
          }}
          
          style={{
            backgroundColor: theme.colors.black,
            margin: 0,
            padding: 0,
          }}
          size={26}
        />
      </View>
    </View>
  );
};

export default React.forwardRef(ChatTextInput);

const styles = StyleSheet.create({
  inputContainer: {
    paddingBottom: 30,
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 0.3,
    paddingHorizontal: 16,
    backgroundColor: "white",
  },
  input: {
    borderRadius: 25,
    width: "85%",
    paddingHorizontal: 15,
  },
});
