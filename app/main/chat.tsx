import { StyleSheet, Text } from "react-native";
import { View } from "@/components/Themed";
import {
  Bubble,
  Composer,
  GiftedChat,
  IMessage,
  InputToolbar,
} from "react-native-gifted-chat";
import { useUserIdValue } from "@/components/RecoilStates/profileState";
import Media from "@/components/MediaViewer/Media";
import { router } from "expo-router";
import { useSetMediaViewerState } from "@/components/MediaViewer/mediaViewerState";
import { useCurrentChatTargetIdValue } from "@/components/RecoilStates/currentChatTargetIdState";
import { useContext, useEffect, useState } from "react";
import "react-native-get-random-values";
import { ConnectionContext } from "./_layout";
import {
  convertMessageDTOToIMessage,
  fetchMessages,
} from "@/common/database/databaseHelper";
import {
  handleReceivedMessagesInChat,
  sendMessage,
} from "@/common/chat/chatHelper";
import { useSQLiteContext } from "expo-sqlite/build/next/hooks";
import { useSetLastMessagesByTargetAndChatTypeState } from "@/components/RecoilStates/lastMessagesState";
import { Button } from "react-native-paper";
import { usePostApiEnquiryConfirm } from "@/common/api/endpoints/cocreateApi";

export default function EnquiryChat() {
  const chatTargetIdTypePair = useCurrentChatTargetIdValue();
  const database = useSQLiteContext();

 

  const connection = useContext(ConnectionContext);
  const userId = useUserIdValue() || 0;

  const [messages, setMessages] = useState<IMessage[]>([]);

  const setLastMessages = useSetLastMessagesByTargetAndChatTypeState();

  useEffect(() => {
    if (!database) return;
    fetchMessages(database, chatTargetIdTypePair)
      .then((fetchedMessages) =>
        fetchedMessages.map((message) => convertMessageDTOToIMessage(message))
      )
      .then(setMessages)
      .catch((error) => console.error("Error fetching messages:", error));
  }, [database]);

  const handleSendMessage = (messages: any[]) => {
    const message = messages[0];
    sendMessage(connection, database, userId, chatTargetIdTypePair, message)
      .then((messageDTO) => {
        if (messageDTO.targetId && messageDTO.chatType !== undefined) {
          setLastMessages(
            {
              chatTargetId: messageDTO.targetId,
              chatType: messageDTO.chatType,
            },
            { ...message, content: messageDTO.content }
          );
        }
        setMessages((state) => [
          convertMessageDTOToIMessage(messageDTO),
          ...state,
        ]);
      })
      .catch((error) => console.error("Error sending message:", error));
  };

  useEffect(() => {
    if (!connection || !database) return;
    const cleanup = handleReceivedMessagesInChat(
      connection,
      chatTargetIdTypePair,
      setMessages
    );
    return cleanup;
  }, [connection, database]);

  const setMediaViewer = useSetMediaViewerState();

  const handleSelectMedia = (uri: string) => {
    setMediaViewer((state) => ({
      visible: false,
      selectedImageIndex: 0,
      uris: [uri],
    }));

    router.push("/main/portofolioModal");
  };

  console.log("rerender");

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={handleSendMessage}
        renderAvatar={null}
        user={{
          _id: userId,
        }}
        renderBubble={(props) => (
          <Bubble {...props} renderTicks={() => <></>} />
        )}
        renderMessageImage={(props) => (
          <Media
            uri={props.currentMessage?.image || ""}
            style={{ width: 150, height: 50 }}
            onPress={() => handleSelectMedia(props.currentMessage?.image || "")}
          />
        )}
        messagesContainerStyle={{ paddingHorizontal: 10 }}
        renderInputToolbar={(props) => (
          <InputToolbar
            {...props}
            containerStyle={{ backgroundColor: "white" }}
            renderComposer={(composerProps) => (
              <Composer
                {...composerProps}
                textInputStyle={{ backgroundColor: "white" }}
              />
            )}
          />
        )}
      />
      {/* <Button
        onPress={() => handleConfirmEnquiry()}
      >
        <Text>Send</Text>
      </Button> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    paddingBottom: 40,
    paddingTop: 60,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
