import { HubConnectionBuilder } from "@microsoft/signalr";
import * as SecureStore from "expo-secure-store";
import SecureStoreKeys from "../api/enum/secureStoreKeys";

export async function fetchTokenAndStartConnection() {
  const token = await SecureStore.getItemAsync(SecureStoreKeys.USER_TOKEN);
  if (!token) {
    throw new Error("Token not found");
  }
  const connection = new HubConnectionBuilder()
    // .withUrl("https://wecreatex.azurewebsites.net/chatHub", {
    .withUrl("http://192.168.1.92:5000/chatHub", {
      accessTokenFactory: () => token,
    })
    .withAutomaticReconnect()
    .build();

  connection
    .start()
    .then(() => console.log("Connection started"))
    .then(() => connection.invoke("GetEncryptedKeyExchangesAsync"))
    .catch((err) => console.log("Error while starting connection: " + err));

  return connection;
}
