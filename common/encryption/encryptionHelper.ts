import * as Crypto from "expo-crypto";
import * as SecureStore from "expo-secure-store";
import CryptoES from "crypto-es";
import nacl from "tweetnacl";
import { Buffer } from "buffer";
import { ChatType } from "@/components/Chats/ChatHelper";
import { EncryptedKeyExchangeCreateDTO } from "../api/model";
import { HubConnection } from "@microsoft/signalr";

export async function generateAESKey(): Promise<string> {
  const aesKey = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    Math.random().toString()
  );
  return aesKey;
}

export function encryptMessageAES(message: string, passphrase: string): string {
  const encryptedMessage = CryptoES.AES.encrypt(message, passphrase).toString();
  return encryptedMessage;
}

export function decryptMessageAES(message: string, passphrase: string): string {
  const descryptedMessage = CryptoES.AES.decrypt(message, passphrase);
  return descryptedMessage.toString(CryptoES.enc.Utf8);
}

export async function generateDatabaseKey(): Promise<string> {
  const databaseKey = await generateAESKey();

  await SecureStore.setItemAsync("CoCreate-Local-Aes-Key", databaseKey);

  return databaseKey;
}

export async function getDatabasKey(): Promise<string | null> {
  return await SecureStore.getItemAsync("CoCreate-Local-Aes-Key");
}

export async function generateKeyPair(): Promise<nacl.BoxKeyPair> {
  const privateKey = await Crypto.getRandomBytesAsync(32);
  const publicKey = nacl.box.keyPair.fromSecretKey(privateKey);

  await SecureStore.setItemAsync(
    "CoCreate-Local-Private-Key",
    toBase64(privateKey)
  );

  await SecureStore.setItemAsync(
    "CoCreate-Local-Public-Key",
    toBase64(publicKey.publicKey)
  );

  return publicKey;
}

export async function getPrivateKey(): Promise<Uint8Array | null> {
  let privateKey = await SecureStore.getItemAsync("CoCreate-Local-Private-Key");
  if (privateKey == null) {
    return null;
  }
  return fromBase64(privateKey);
}

export async function getPublicKey(): Promise<Uint8Array | null> {
  let publicKey = await SecureStore.getItemAsync("CoCreate-Local-Public-Key");
  if (publicKey == null) {
    return null;
  }
  return fromBase64(publicKey);
}

export async function encryptMessageDFH(
  message: string,
  nonce: Uint8Array,
  publicKey: string
): Promise<string> {
  const privateKey = await getPrivateKey();

  if (privateKey == null) {
    throw new Error("Private key not found");
  }

  var byteArrayMessage = nacl.box(
    new Uint8Array(Buffer.from(message)),
    nonce,
    fromBase64(publicKey),
    privateKey
  );

  return toBase64(byteArrayMessage);
}

export async function decryptMessageDFH(
  message: string,
  nonce: string,
  publicKey: string
): Promise<string> {
  const privateKey = await getPrivateKey();

  if (privateKey == null) {
    throw new Error("Private key not found");
  }

  var byteArrayMessage = nacl.box.open(
    fromBase64(message),
    fromBase64(nonce),
    fromBase64(publicKey),
    privateKey
  );

  if (byteArrayMessage == null) {
    throw new Error("Decryption failed");
  }

  return Buffer.from(byteArrayMessage).toString();
}

export function toBase64(arr: Uint8Array): string {
  return Buffer.from(arr).toString("base64");
}

export function fromBase64(base64String: string): Uint8Array {
  return Uint8Array.from(Buffer.from(base64String, "base64"));
}

export function getNonce(): Uint8Array {
  return Crypto.getRandomBytes(24);
}

export async function createAndExchangeKeys(
  receiverPublicKey: string,
  receiverId: number,
  chatType: ChatType,
  connection: HubConnection | null
): Promise<void> {
  const aesKey = await generateAESKey();
  await SecureStore.setItemAsync(getAesKeyString(chatType, receiverId), aesKey);

  const nonce = getNonce();
  const encryptedKey = await encryptMessageDFH(
    aesKey,
    nonce,
    receiverPublicKey
  );

  const publicKey = await getPublicKey();

  if (publicKey == null) {
    throw new Error("Public key not found");
  }

  const keyExchangeDTO: EncryptedKeyExchangeCreateDTO = {
    chatType: chatType,
    encryptedSymmetricKey: encryptedKey,
    nonce: toBase64(nonce),
    publicKey: toBase64(publicKey),
    targetId: receiverId,
  };

  await connection?.invoke("KeyExchangeAsync", keyExchangeDTO);
}

export function getAesKeyString(chatType: ChatType, targetId: number): string {
  return "CoCreate-" + chatType + "-" + targetId + "-Aes-Key";
}

export function getSymmetricAesKey(
  chatType: ChatType,
  targetId: number
): Promise<string | null> {
  return SecureStore.getItemAsync(getAesKeyString(chatType, targetId));
}
