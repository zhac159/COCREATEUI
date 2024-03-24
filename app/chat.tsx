import { StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import {
  Bubble,
  Composer,
  GiftedChat,
  IMessage,
  InputToolbar,
} from "react-native-gifted-chat";
import { useUserIdValue } from "@/components/RecoilStates/profileState";
import { MessageCreateDTO, MessageDTO } from "@/common/api/model";
import Media from "@/components/MediaViewer/Media";
import { router } from "expo-router";
import { useSetMediaViewerState } from "@/components/MediaViewer/mediaViewerState";
import { useCurrentChatIdValue } from "@/components/RecoilStates/currentChatIdState";
import { useContext, useEffect, useState } from "react";
import { ConnectionContext, DatabaseContext } from "./_layout";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export default function EnquiryChat() {
  const chatIdTypePair = useCurrentChatIdValue();

  const database = useContext(DatabaseContext);
  const connection = useContext(ConnectionContext);

  const [messages, setMessages] = useState<MessageDTO[]>([]);

  const setMediaViewer = useSetMediaViewerState();

  useEffect(() => {
    if (!database) {
      return;
    }

    database.transaction((tx) => {
      tx.executeSql(
        `select * from messages where chatId = ? and chatType = ?`,
        [chatIdTypePair.chatId, chatIdTypePair.chatType],
        (_, resultSet) => {
          const rows: MessageDTO[] = Array.from(
            { length: resultSet.rows.length },
            (_, i) => resultSet.rows.item(i) as MessageDTO
          );
          setMessages(rows);
        },
        (_, error) => {
          console.log("Select error:", error);
          return true;
        }
      );
    });
  }, [database]);

  const userId = useUserIdValue() || 0;

  const transformedMessages: IMessage[] =
    messages
      ?.map((message, index) => ({
        _id: `${message.id}-${index}`,
        text: message.content || "",
        createdAt: new Date(message.date || ""),
        sent: true,
        user: {
          _id: message.senderId || "unknown",
          name: message.senderId === userId ? "You" : "Other",
        },
        // image: "https://picsum.photos/200/300",
      }))
      .reverse() || [];

  const handleSendMessage = (messages: any[]) => {
    const message = messages[0];

    if (!connection) {
      console.error("Connection is not established");
      return;
    }


    if (!database) {
      return;
    }
    
    const id: string = uuidv4();

    const messageCreateDTO: MessageCreateDTO = {
      id,
      content: message.text,
      chatId: chatIdTypePair.chatId,
      chatType: chatIdTypePair.chatType,
      date: new Date().toISOString(),
      uri: null,
    };

    database.transaction((tx) => {
      tx.executeSql(
        `insert into messages (id, senderId, content, uri, mediaType, date, chatType, chatId) values (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id,
          userId,
          message.text || null,
          message.uri || null,
          message.mediaType || null,
          messageCreateDTO.date,
          chatIdTypePair.chatType,
          chatIdTypePair.chatId,
        ],
        (_, resultSet) => console.log("Insert success:", resultSet),
        (_, error) => {
          console.log("Insert error:", error);
          return true; // return true to stop transaction
        }
      );
    });

    try {
      console.log("Sending message: ", messageCreateDTO);
      connection.invoke("SendMessageAsync", messageCreateDTO);
    } catch (err) {
      console.error("Error sending message: ", err);
    }
  };

  const handleSelectMedia = (uri: string) => {
    setMediaViewer((state) => ({
      visible: false,
      selectedImageIndex: 0,
      uris: [uri],
    }));

    router.push("/portofolioModal");
  };

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={transformedMessages}
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
