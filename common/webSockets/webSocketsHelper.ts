import {  HubConnectionBuilder } from "@microsoft/signalr";
import * as SecureStore from "expo-secure-store";


export async function fetchTokenAndStartConnection() {
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
    .then(() => connection.invoke("GetMessagesAsync"))
    .catch((err) => console.log("Error while starting connection: " + err));

  return connection;
}
