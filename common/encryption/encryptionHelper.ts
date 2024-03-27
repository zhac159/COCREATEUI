import  * as Crypto from "expo-crypto";
import * as SecureStore from "expo-secure-store";
import CryptoES from "crypto-es";

export async function generateEncryptionKey(): Promise<void> {
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
  
  