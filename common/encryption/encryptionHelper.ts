import * as Crypto from "expo-crypto";
import * as SecureStore from "expo-secure-store";
import CryptoES from "crypto-es";
import nacl from "tweetnacl";
import { Buffer } from "buffer";

export async function generateDatabaseKey(): Promise<string> {
  const passphrase = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    Math.random().toString()
  );
  await SecureStore.setItemAsync("CoCreate-Local-Aes-Key", passphrase);

  return passphrase;
}

export async function getAesKey(): Promise<string | null> {
  return await SecureStore.getItemAsync("CoCreate-Local-Aes-Key");
}

export function encryptMessageAES(message: string, passphrase: string): string {
  const encryptedMessage = CryptoES.AES.encrypt(message, passphrase).toString();
  return encryptedMessage;
}

export function decryptMessageAES(message: string, passphrase: string): string {
  const descryptedMessage = CryptoES.AES.decrypt(message, passphrase);
  return descryptedMessage.toString(CryptoES.enc.Utf8);
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

export async function generateKeyPair(): Promise<nacl.BoxKeyPair> {

  const privateKey = await Crypto.getRandomBytesAsync(32);
  const publicKey = nacl.box.keyPair.fromSecretKey(privateKey);

  await SecureStore.setItemAsync(
    "CoCreate-Local-Private-Key",
    toBase64(privateKey)
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

export function toBase64(arr: Uint8Array): string {
  return Buffer.from(arr).toString("base64");
}

export function fromBase64(base64String: string): Uint8Array {
  return Uint8Array.from(Buffer.from(base64String, "base64"));
}

export function getNonce(): Uint8Array {
  return Crypto.getRandomBytes(24);
}
