import { EncryptedKeyExchangeCreateDTO } from "@/api/model";

export enum WebSocketInvocations{
    ExchangeKey = "KeyExchangeAsync",
}

export type WebSocketMessage = {
    [WebSocketInvocations.ExchangeKey]: EncryptedKeyExchangeCreateDTO;
  }
  