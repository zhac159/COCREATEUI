import { useUserIdValue } from "@/components/RecoilStates/profileState";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import "react-native-get-random-values";
import { ConnectionContext } from "./_layout";

import {
  useAddReaction,
  useLoadMessages,
  useLoadMessagesAroundMessage,
  useSendMessage,
} from "@/common/chat/chatHelper";
import { useSQLiteContext } from "expo-sqlite/build/next/hooks";
import { useGetMedia } from "@/components/Account/Common/Media/mediaHelper";
import SendImagePortal from "@/components/Chats/SendImagePortal";
import { useCurrentChatDataValue } from "@/components/RecoilStates/currentChatDataState";
import Chat from "@/components/Chats/Chat";
import ChatHeader from "@/components/Chats/ChatHeader/CheatHeader";
import Message from "@/components/Common/Messages/Message";
import { useLastMessagesByTargetAndChatTypeValue } from "@/components/RecoilStates/lastMessagesState";
import MessageReaction from "@/components/Common/Messages/MessageReaction";
import BackgroundColourAnimation from "@/components/Account/BackgroundColourAnimation";
import { useNewMessageReactionValue } from "@/components/RecoilStates/newMessageReactionState";

export default function EnquiryChat() {
  const database = useSQLiteContext();
  const connection = useContext(ConnectionContext);
  const currentChatDataValue = useCurrentChatDataValue();
  const userId = useUserIdValue();

  const [messages, setMessages] = useState<Message[]>([]);
  const [uris, setUris] = useState<string[]>([]);
  const getMedia = useGetMedia(setUris, true);

  const lastMessages = useLastMessagesByTargetAndChatTypeValue(
    currentChatDataValue.chatTypeIdPair
  );

  const newMessageReaction = useNewMessageReactionValue();

  useEffect(() => {
    if (newMessageReaction === null) return;

    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.id === newMessageReaction.messageId
          ? {
              ...message,
              reactions: [
                ...(message.reactions || []),
                { ...newMessageReaction, user: userId },
              ],
            }
          : message
      )
    );
  }, [newMessageReaction]);

  useEffect(() => {
    if (lastMessages[0] === undefined) return;
    if (messages.length === 0) {
      console.log("setting messages");
      return;
    }
    if (lastMessages[0].id !== messages[0].id) {
      setMessages([lastMessages[0], ...messages]);
    }
  }, [lastMessages]);

  const handleSendMessage = useSendMessage(
    connection,
    database,
    userId,
    currentChatDataValue.chatTypeIdPair,
    setMessages
  );

  const loadMessages = useLoadMessages(
    database,
    currentChatDataValue.chatTypeIdPair,
    setMessages
  );

  const loadMessagesAroundMessage = useLoadMessagesAroundMessage(
    database,
    currentChatDataValue.chatTypeIdPair,
    setMessages
  );

  const addReaction = useAddReaction(
    connection,
    database,
    userId,
    currentChatDataValue.chatTypeIdPair
  );

  const handleAddReaction = useCallback(
    async (messageReaction: MessageReaction) => {
      await addReaction(messageReaction);

      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          message.id === messageReaction.messageId
            ? {
                ...message,
                reactions: [
                  ...(message.reactions || []),
                  { ...messageReaction, user: userId },
                ],
              }
            : message
        )
      );
    },
    [addReaction, setMessages]
  );

  const handleLoadMessages = useCallback(async () => {
    const lastmessage = messages[messages.length - 1];

    if (!lastmessage) return;
    const lastMessageDate = new Date(lastmessage.date!);

    lastMessageDate.setMilliseconds(lastMessageDate.getMilliseconds() - 10);

    await loadMessages(true, lastMessageDate.toISOString());
  }, [loadMessages, messages]);

  const handleLoadLaterMessages = useCallback(async () => {
    const firstMessage = messages[0];
    if (!firstMessage) return;

    let firstMessageDate = new Date(firstMessage.date!);

    firstMessageDate.setMilliseconds(firstMessageDate.getMilliseconds() + 10);

    await loadMessages(false, firstMessageDate.toISOString());
  }, [loadMessages, messages]);

  const handleLoadMessagesAroundMessage = useCallback(
    async (message: Message) => {
      await loadMessagesAroundMessage(message);
    },
    [loadMessagesAroundMessage]
  );

  useEffect(() => {
    const fetchMessages = async () => {
      await loadMessages(true);
    };
    fetchMessages();
  }, []);

  const momoizedBackgroundColourAnimation = useMemo(() => {
    return <BackgroundColourAnimation />;
  }, []);

  if (connection === null) return null;

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
    <>
      {momoizedBackgroundColourAnimation}
      <Chat
        messages={messages}
        handleLoadMessages={handleLoadMessages}
        handleLoadLaterMessages={handleLoadLaterMessages}
        handleLoadMessagesAroundMessage={handleLoadMessagesAroundMessage}
        handleSendMessage={handleSendMessage}
        handleAddReaction={handleAddReaction}
        getMedia={getMedia}
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
