import * as Crypto from "expo-crypto";
import * as SecureStore from "expo-secure-store";
import CryptoES from "crypto-es";
import * as nacl from "tweetnacl";
import { Buffer } from "buffer";

export async function generateDatabaseKey(): Promise<void> {
  const passphrase = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    Math.random().toString()
  );
  await SecureStore.setItemAsync("CoCreate-Local-Aes-Key", passphrase);
}

export async function getAesKey(): Promise<string | null> {
  return await SecureStore.getItemAsync("CoCreate-Local-Aes-Key");
}

export function encryptMessage(message: string, passphrase: string): string {
  const encryptedMessage = CryptoES.AES.encrypt(message, passphrase).toString();
  return encryptedMessage;
}

export function decryptMessage(message: string, passphrase: string): string {
  const descryptedMessage = CryptoES.AES.decrypt(message, passphrase);
  return descryptedMessage.toString(CryptoES.enc.Utf8);
}

export async function generateKeyPair(): Promise<nacl.BoxKeyPair> {
  var keys = nacl.box.keyPair();
  await SecureStore.getItemAsync("CoCreate-Local-Private-Key");
  return keys;
}

export function toBase64(arr: Uint8Array): string {
  return Buffer.from(arr).toString("base64");
}

export function fromBase64(base64String: string): Uint8Array {
  return Uint8Array.from(Buffer.from(base64String, "base64"));
}

export function getNonce(): Uint8Array {
  return  Crypto.getRandomBytes(24);
}