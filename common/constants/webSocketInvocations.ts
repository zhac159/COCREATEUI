import { EncryptedKeyExchangeCreateDTO } from "@/api/model";

export enum WebSocketInvocations {
  ExchangeKey = "KeyExchangeAsync",
  GetEncryptedKeyExchangesAsync = "GetEncryptedKeyExchangesAsync",
  AknowledgeEncryptedKeyExchangeAsync = "AknowledgeEncryptedKeyExchangeAsync",
}

export type WebSocketMessage = {
  [WebSocketInvocations.ExchangeKey]: EncryptedKeyExchangeCreateDTO[];
  [WebSocketInvocations.GetEncryptedKeyExchangesAsync]: null;
  [WebSocketInvocations.AknowledgeEncryptedKeyExchangeAsync]: string[];
};
