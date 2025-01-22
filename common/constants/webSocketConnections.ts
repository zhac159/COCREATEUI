import { EncryptedKeyExchangeDTO, MessageDTO } from "@/api/model";

export enum WebSocketConnections {
  ReceiveEncryptedKeysExchange = "ReceiveEncryptedKeysExchange",
  ReceiveMessages = "ReceiveMessages",
}

export type WebSocketReceivingMessage = {
  [WebSocketConnections.ReceiveEncryptedKeysExchange]: EncryptedKeyExchangeDTO[];
  [WebSocketConnections.ReceiveMessages]: MessageDTO[];
};

export type WebSocketCallback<T extends WebSocketConnections> = (
  data: WebSocketReceivingMessage[T]
) => void;
