import {
  StyleSheet,
  View,
} from "react-native";
import {
  Bubble,
  Composer,
  GiftedChat,
  IMessage,
  InputToolbar,
} from "react-native-gifted-chat";
import { useUserIdValue } from "@/components/RecoilStates/profileState";
import Media from "@/components/MediaViewer/Media";
import { useCurrentChatTargetIdValue } from "@/components/RecoilStates/currentChatTargetIdState";
import { useCallback, useContext, useEffect, useState } from "react";
import "react-native-get-random-values";
import { ConnectionContext } from "./_layout";

import {
  convertIMessageToCreateMessageDTO,
  handleReceivedMessagesInChat,
  useChatMessages,
  useSendMessage,
} from "@/common/chat/chatHelper";
import { useSQLiteContext } from "expo-sqlite/build/next/hooks";
import { FontAwesome6 } from "@expo/vector-icons";
import { IconButton } from "react-native-paper";
import { useGetMedia } from "@/components/Account/Common/Media/mediaHelper";
import SendImagePortal from "@/components/Chats/SendImagePortal";

export default function EnquiryChat() {
  const database = useSQLiteContext();
  const connection = useContext(ConnectionContext);
  const chatTargetIdTypePair = useCurrentChatTargetIdValue();
  const userId = useUserIdValue() || 0;

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [uris, setUris] = useState<string[]>([]);
  const getMedia = useGetMedia(setUris, true);

  const loadMessages = useChatMessages(
    database,
    chatTargetIdTypePair,
    setMessages
  );

  const handleSendMessage = useSendMessage(
    connection,
    database,
    userId,
    chatTargetIdTypePair,
    setMessages
  );

  const handleLoadMessages = useCallback(async () => {
    const lastmessage = messages[messages.length - 1];
    if (!lastmessage) return;
    const lastMessageDate = lastmessage.createdAt as Date
    
    await loadMessages(lastMessageDate.toISOString());
  }, [loadMessages, messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      await loadMessages();
    };
    fetchMessages();
  }, []);

  useEffect(() => {
    if (!connection || !database) return;
    const cleanup = handleReceivedMessagesInChat(
      connection,
      chatTargetIdTypePair,
      setMessages
    );
    return cleanup;
  }, [connection, database]);

  if (uris.length > 0) {
    return (
      <SendImagePortal
        handleSendMessage={handleSendMessage}
        setUris={setUris}
        uri={uris[0]}
      />
    );
  }

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        loadEarlier={false}
        listViewProps={{
          onEndReached: () => {
            handleLoadMessages();
          },
          onEndReachedThreshold: 0.5,
        }}
        onSend={(messages) => {
          const message = convertIMessageToCreateMessageDTO(messages[0]);
          handleSendMessage(message);
        }}
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
          />
        )}
        messagesContainerStyle={{ paddingHorizontal: 10 }}
        renderActions={(props) => (
          <View>
            <IconButton
              onPress={() => getMedia(0)}
              icon={() => <FontAwesome6 name="camera" size={18} solid />}
              size={26}
            />
          </View>
        )}
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
