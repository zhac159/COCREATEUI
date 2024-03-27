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
import { useCurrentChatIdValue } from "@/components/RecoilStates/currentChatIdState";
import { useContext, useEffect, useState } from "react";
import "react-native-get-random-values";
import { ConnectionContext, DatabaseContext } from "./_layout";
import {
  convertMessageDTOToIMessage,
  fetchMessages,
} from "@/common/database/databaseHelper";
import {
  handleReceivedMessagesInChat,
  sendMessage,
} from "@/common/chat/chatHelper";
import * as Crypto from "expo-crypto";
import CryptoES from "crypto-es";
import { Button } from "react-native-paper";

import * as nacl from "tweetnacl";

export default function EnquiryChat() {
  const chatIdTypePair = useCurrentChatIdValue();
  const database = useContext(DatabaseContext);

  const handleEncryption = async () => {
    // // Generate Alice's keys
    // const aliceKeys = nacl.box.keyPair();

    // // Generate Bob's keys
    // const bobKeys = nacl.box.keyPair();

    // // Alice uses her private key and Bob's public key to derive a shared secret
    // const aliceSharedSecret = nacl.box.before(
    //   bobKeys.publicKey,
    //   aliceKeys.secretKey
    // );

    // // Bob uses his private key and Alice's public key to derive a shared secret
    // const bobSharedSecret = nacl.box.before(
    //   aliceKeys.publicKey,
    //   bobKeys.secretKey
    // );

    // const nonce = nacl.randomBytes(24);

    // // Alice encrypts a message for Bob
    // const secretMessage = nacl.box(
    //   new Uint8Array([1, 2, 3]),
    //   nonce,
    //   bobKeys.publicKey,
    //   aliceKeys.secretKey
    // );

    // console.log(secretMessage);

    // //loop 100 times

    // for (let i = 0; i < 100; i++) {
    //   const decryptedMessage = nacl.box.open(
    //     secretMessage,
    //     nonce,
    //     aliceKeys.publicKey,
    //     bobKeys.secretKey
    //   );
    // }
    // console.log("decryptedMessage");


    // // aliceSharedSecret and bobSharedSecret should now be the same
    // console.log(
    //   "Shared secrets match:",
    //   nacl.verify(aliceSharedSecret, bobSharedSecret)
    // );

    const passphrase = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      Math.random().toString()
    );

    const messages2: string[] = Array(100).fill("Hello, world!");

    const encryptedMessages = messages2.map((message) => {
      const encrypted = CryptoES.AES.encrypt(message, passphrase);
      return encrypted.toString();
    });

    const decryptedMessages = encryptedMessages.map((encrypted) => {
      const decrypted = CryptoES.AES.decrypt(encrypted, passphrase);
      return decrypted.toString(CryptoES.enc.Utf8);
    });

    console.log("Encrypted messages:", encryptedMessages);
    console.log("Decrypted messages:", decryptedMessages);
  };

  const connection = useContext(ConnectionContext);
  const userId = useUserIdValue() || 0;

  const [messages, setMessages] = useState<IMessage[]>([]);

  const setMediaViewer = useSetMediaViewerState();

  useEffect(() => {
    if (!database) return;

    fetchMessages(database, chatIdTypePair)
      .then((fetchedMessages) =>
        fetchedMessages.map((message) => convertMessageDTOToIMessage(message))
      )
      .then(setMessages)
      .catch((error) => console.error("Error fetching messages:", error));
  }, [database]);

  const handleSendMessage = (messages: any[]) => {
    const message = messages[0];
    console.log("Message:", message);
    sendMessage(connection, database, userId, chatIdTypePair, message)
      .then((messageDTO) => {
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
      chatIdTypePair,
      setMessages
    );

    return cleanup;
  }, [connection, database]);

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
      <Button
        onPress={() => {
          handleEncryption();
        }}
      >
        <Text>Send</Text>
      </Button>
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
