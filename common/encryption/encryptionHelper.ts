import * as Crypto from "expo-crypto";
import * as SecureStore from "expo-secure-store";
import CryptoES from "crypto-es";
import nacl from "tweetnacl";
import { Buffer } from "buffer";
import { EncryptedKeyExchangeCreateDTO } from "../api/model";
import { HubConnection } from "@microsoft/signalr";
import SecureStoreKeys from "../api/enum/secureStoreKeys";

export function getAesKeyString(chatId: string): string {
  return "CoCreate-" + chatId + "-Aes-Key";
}
export function getAsymmetricKeyName(key: string, userId: number): string {
  return key + "-" + userId;
}

export async function generateAndStoreSymmetricAesKey(
  chatId: string
): Promise<string> {
  const key = await generateAESKey();
  await SecureStore.setItemAsync(getAesKeyString(chatId), key);
  return key;
}

export async function generateAESKey(): Promise<string> {
  const aesKey = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    Math.random().toString()
  );
  return aesKey;
}

export function getSymmetricAesKey(chatId: string): Promise<string | null> {
  return SecureStore.getItemAsync(getAesKeyString(chatId));
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
  const existingKey = await SecureStore.getItemAsync("CoCreate-Local-Aes-Key");
  if (existingKey) {
    return existingKey;
  } else {
    const databaseKey = await generateAESKey();
    await SecureStore.setItemAsync("CoCreate-Local-Aes-Key", databaseKey);
    return databaseKey;
  }
}

export async function getDatabasKey(): Promise<string | null> {
  return await SecureStore.getItemAsync("CoCreate-Local-Aes-Key");
}

export async function generateKeyPair(
  userId: number
): Promise<nacl.BoxKeyPair> {
  const privateKey = await Crypto.getRandomBytesAsync(32);
  const publicKey = nacl.box.keyPair.fromSecretKey(privateKey);

  await SecureStore.setItemAsync(
    getAsymmetricKeyName(SecureStoreKeys.PRIVATE_KEY, userId),
    toBase64(privateKey)
  );

  await SecureStore.setItemAsync(
    getAsymmetricKeyName(SecureStoreKeys.PUBLIC_KEY, userId),
    toBase64(publicKey.publicKey)
  );

  return publicKey;
}

export async function getAsymmetricKeyKey(keyName: string, userId: number): Promise<Uint8Array | null> {
  let publicKey = await SecureStore.getItemAsync(getAsymmetricKeyName(keyName, userId));
  if (publicKey == null) {
    return null;
  }
  return fromBase64(publicKey);
}

export async function encryptMessageDFH(
  message: string,
  nonce: Uint8Array,
  publicKey: string,
  userId: number
): Promise<string> {
  const privateKey = await getAsymmetricKeyKey(SecureStoreKeys.PRIVATE_KEY, userId);

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
  publicKey: string,
  userId: number
): Promise<string> {
  const privateKey = await getAsymmetricKeyKey(SecureStoreKeys.PRIVATE_KEY, userId);

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
  chatId: string,
  userId: number,
  connection: HubConnection
): Promise<void> {
  const publicKey = await getAsymmetricKeyKey(SecureStoreKeys.PUBLIC_KEY, userId);

  if (publicKey == null) {
    throw new Error("Public key not found");
  }

  const aesKey = await generateAndStoreSymmetricAesKey(chatId);

  console.log("aesKey", aesKey);

  const nonce = getNonce();

  const encryptedKey = await encryptMessageDFH(
    aesKey,
    nonce,
    receiverPublicKey,
    userId
  );

  const keyExchangeDTO: EncryptedKeyExchangeCreateDTO = {
    encryptedSymmetricKey: encryptedKey,
    nonce: toBase64(nonce),
    publicKey: toBase64(publicKey),
    chatId: chatId,
    targetId: receiverId,
  };

  console.log("KeyExchangeAsync", keyExchangeDTO);

  await connection?.invoke("KeyExchangeAsync", keyExchangeDTO);
}

export async function createAndExchangeKeysIfThereIsNoKey(
  receiverPublicKey: string,
  receiverId: number,
  chatId: string,
  userId: number,
  connection: HubConnection
): Promise<void> {
  const aesKey = await getSymmetricAesKey(chatId);

  if (aesKey != null) {
    return;
  }

  await createAndExchangeKeys(
    receiverPublicKey,
    receiverId,
    chatId,
    userId,
    connection
  );
}

export async function exchangeProjectKey(
  receiverPublicKey: string,
  receiverId: number,
  chatId: string,
  userId: number,
  connection: HubConnection | null
): Promise<void> {
  const projectKey = await getSymmetricAesKey(chatId);

  if (projectKey == null) {
    return;
  }

  const nonce = getNonce();
  const encryptedKey = await encryptMessageDFH(
    projectKey,
    nonce,
    receiverPublicKey,
    userId
  );

  const publicKey = await getAsymmetricKeyKey(SecureStoreKeys.PUBLIC_KEY, userId);

  if (publicKey == null) return;

  const keyExchangeDTO: EncryptedKeyExchangeCreateDTO = {
    chatId: chatId,
    encryptedSymmetricKey: encryptedKey,
    nonce: toBase64(nonce),
    publicKey: toBase64(publicKey),
    targetId: receiverId,
  };

  await connection?.invoke("KeyExchangeAsync", keyExchangeDTO);
}

export async function hashPassword(password: string): Promise<string> {
  return await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password
  );
}
