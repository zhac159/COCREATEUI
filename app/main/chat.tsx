import { useUserIdValue } from "@/components/RecoilStates/profileState";
import { useCallback, useContext, useEffect, useState } from "react";
import "react-native-get-random-values";
import { ConnectionContext } from "./_layout";

import {
  handleReceivedMessagesInChat,
  useChatMessages,
  useSendMessage,
} from "@/common/chat/chatHelper";
import { useSQLiteContext } from "expo-sqlite/build/next/hooks";
import { useGetMedia } from "@/components/Account/Common/Media/mediaHelper";
import SendImagePortal from "@/components/Chats/SendImagePortal";
import { useCurrentChatDataValue } from "@/components/RecoilStates/currentChatDataState";
import Chat from "@/components/Chats/Chat";
import ChatHeader from "@/components/Chats/CheatHeader";
import Message from "@/components/Common/Messages/Message";
import { useLastMessagesByTargetAndChatTypeValue } from "@/components/RecoilStates/lastMessagesState";

export default function EnquiryChat() {
  const database = useSQLiteContext();
  const connection = useContext(ConnectionContext);
  const currentChatDataValue = useCurrentChatDataValue();
  const userId = useUserIdValue();

  const lastMessages = useLastMessagesByTargetAndChatTypeValue(currentChatDataValue.chatTypeIdPair)

  console.log(lastMessages)


  const [messages, setMessages] = useState<Message[]>([]);
  const [uris, setUris] = useState<string[]>([]);
  const getMedia = useGetMedia(setUris, true);

  const loadMessages = useChatMessages(
    database,
    currentChatDataValue.chatTypeIdPair,
    setMessages
  );

  const handleSendMessage = useSendMessage(
    connection,
    database,
    userId,
    currentChatDataValue.chatTypeIdPair,
    setMessages
  );

  const handleLoadMessages = useCallback(async () => {
    const lastmessage = messages[messages.length - 1];
    if (!lastmessage) return;
    const lastMessageDate = new Date(lastmessage.date!);

    await loadMessages(lastMessageDate.toISOString());
  }, [loadMessages, messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      await loadMessages();
    };
    fetchMessages();
  }, []);

  // useEffect(() => {
  //   if (!connection || !database) return;
  //   const cleanup = handleReceivedMessagesInChat(
  //     connection,
  //     currentChatDataValue.chatTypeIdPair,
  //     setMessages
  //   );
  //   return cleanup;
  // }, [connection, database]);

  if(connection === null) return (null)

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
    // <GiftedChat
    //   messages={messages}
    //   loadEarlier={false}
    //   listViewProps={{
    //     onEndReached: () => {
    //       handleLoadMessages();
    //     },
    //     onEndReachedThreshold: 0.5,
    //   }}
    //   onSend={(messages) => {
    //     const message = convertIMessageToCreateMessageDTO(messages[0]);
    //     handleSendMessage(message);
    //   }}
    //   renderAvatar={null}
    //   user={{
    //     _id: userId,
    //   }}
    //   renderBubble={(props) => (
    //     <Bubble
    //       {...props}
    //       onPress={(context, message) => {
    //         console.log("dsa")
    //         console.log(message)
    //       }}
    //       renderTicks={() => <></>}
    //     />
    //   )}
    //   renderMessageImage={(props) => (
    //     <Media
    //       uri={props.currentMessage?.image || ""}
    //       style={{ width: 150, height: 50 }}
    //     />
    //   )}
    //   messagesContainerStyle={{ paddingHorizontal: 10 }}
    //   renderActions={(props) => (
    //     <View>
    //       <IconButton
    //         onPress={() => getMedia(0)}
    //         icon={() => <FontAwesome6 name="camera" size={18} solid />}
    //         size={26}
    //       />
    //     </View>
    //   )}
    //   renderInputToolbar={(props) => (
    //     <InputToolbar
    //       {...props}
    //       containerStyle={{ backgroundColor: "white" }}
    //       renderComposer={(composerProps) => (
    //         <Composer
    //           {...composerProps}
    //           textInputStyle={{ backgroundColor: "white" }}
    //
    <>
      <Chat
        messages={messages}
        handleLoadMessages={handleLoadMessages}
        handleSendMessage={handleSendMessage}
        userId={userId}
      />
      <ChatHeader
        currentChatData={currentChatDataValue}
        connection={connection}
        userId={userId}
      />
    </>
  );
}
