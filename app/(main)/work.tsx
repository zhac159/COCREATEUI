import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { Text, View } from "@/components/Themed";
import * as SecureStore from "expo-secure-store";
import { Composer, GiftedChat, InputToolbar } from "react-native-gifted-chat";

export default function Work() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchTokenAndStartConnection = async () => {
      const token = await SecureStore.getItemAsync("userToken");
      if (!token) {
        throw new Error("Token not found");
      }
      const connection = new HubConnectionBuilder()
        .withUrl("http://192.168.1.92:5000/chatHub", {
          accessTokenFactory: () => token,
        })
        .withAutomaticReconnect()
        .build();

      connection
        .start()
        .then(() => console.log("Connection started"))
        .catch((err) => console.log("Error while starting connection: " + err));

      // connection.on("ReceiveMessage", (message) => {
      //   setMessage(message);
      //   Alert.alert("New message", message);
      // });

      return () => {
        connection.stop().then(() => console.log("Connection stopped"));
      };
    };

    fetchTokenAndStartConnection();
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      style={
        styles.container
      }
    >
      <GiftedChat
        messages={[]}
        // onSend={(newMessages) => onSend(newMessages)}
        // imageStyle={{ width: 200, height: 200 }}
        user={{
          _id: 1,
        }}
        bottomOffset={0}
        minInputToolbarHeight={-30}
        renderInputToolbar={(props) => (
          <InputToolbar
            {...props}
            containerStyle={{ backgroundColor: 'white' }}
            renderComposer={(composerProps) => (
              <Composer
                {...composerProps}
                textInputStyle={{ backgroundColor: 'white', marginBottom: 0}}
              />
            )}
          />
        )}
      />
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  message: {
    fontSize: 16,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
