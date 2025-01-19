import { EncryptedKeyExchangeDTO } from "@/api/model";

export enum WebSocketConnections {
  ReceiveEncryptedKeysExchange = "ReceiveEncryptedKeysExchange",
}

export type WebSocketReceivingMessage = {
  [WebSocketConnections.ReceiveEncryptedKeysExchange]: EncryptedKeyExchangeDTO[];
};

export type WebSocketCallback<T extends WebSocketConnections> = (data: WebSocketReceivingMessage[T]) => void;
