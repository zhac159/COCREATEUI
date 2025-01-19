import { EncryptedKeyExchangeCreateDTO, MessageCreateDTO } from "@/api/model";

export enum WebSocketInvocations {
  ExchangeKey = "KeyExchangeAsync",
  GetEncryptedKeyExchangesAsync = "GetEncryptedKeyExchangesAsync",
  AknowledgeEncryptedKeyExchangeAsync = "AknowledgeEncryptedKeyExchangeAsync",
  SendMessageAsync = "SendMessageAsync",
}

export type WebSocketMessage = {
  [WebSocketInvocations.ExchangeKey]: EncryptedKeyExchangeCreateDTO[];
  [WebSocketInvocations.GetEncryptedKeyExchangesAsync]: null;
  [WebSocketInvocations.AknowledgeEncryptedKeyExchangeAsync]: string[];
  [WebSocketInvocations.SendMessageAsync]: MessageCreateDTO;
};
