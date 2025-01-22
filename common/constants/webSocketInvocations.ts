import { EncryptedKeyExchangeCreateDTO, MessageCreateDTO } from "@/api/model";

export enum WebSocketInvocations {
  ExchangeKey = "KeyExchangeAsync",
  GetEncryptedKeyExchangesAsync = "GetEncryptedKeyExchangesAsync",
  AknowledgeEncryptedKeyExchangeAsync = "AknowledgeEncryptedKeyExchangeAsync",
  SendMessageAsync = "SendMessageAsync",
  GetMessagesAsync = "GetMessagesAsync",
  AknowledgeMessagesAsync = "AknowledgeMessagesAsync",
}

export type WebSocketMessage = {
  [WebSocketInvocations.ExchangeKey]: EncryptedKeyExchangeCreateDTO[];
  [WebSocketInvocations.GetEncryptedKeyExchangesAsync]: null;
  [WebSocketInvocations.AknowledgeEncryptedKeyExchangeAsync]: string[];
  [WebSocketInvocations.SendMessageAsync]: MessageCreateDTO;
  [WebSocketInvocations.GetMessagesAsync]: null;
  [WebSocketInvocations.AknowledgeMessagesAsync]: string[];
};
