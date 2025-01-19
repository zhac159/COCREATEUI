import nacl from "tweetnacl";
import { useSecureStorage } from "../useSecureStorage";
import * as Crypto from "expo-crypto";
import { Buffer } from "buffer";
import SecureStoreKeys from "@/common/constants/secureStoreKeys";
import { usePutApiUserPublicKey } from "@/api/endpoints/cocreateApi";
import { useAuthStore } from "@/common/stores/authStore";
import { useCallback, useState } from "react";

export const useAsymmetricKeyExchange = () => {
  const { setSecureValue, getSecureValue } = useSecureStorage();

  const [localPublicKey, setLocalPublicKey] = useState<string>("");
  const [localPrivateKey, setLocalPrivateKey] = useState<string>("");

  const { mutate: setServerPublicKey } = usePutApiUserPublicKey();

  const userId = useAuthStore((state) => state.auth.userId);
  const publicKey = useAuthStore((state) => state.auth.publicKey);

  const toBase64 = (arr: Uint8Array) => {
    return Buffer.from(arr).toString("base64");
  };
  const fromBase64 = (base64String: string) => {
    return Uint8Array.from(Buffer.from(base64String, "base64"));
  };

  const doesPublicKeyMatch = useCallback(async () => {
    const storedPublicKey = await getSecureValue(SecureStoreKeys.PUBLIC_KEY);
    const storedPrivateKey = await getSecureValue(SecureStoreKeys.PRIVATE_KEY);
    if (!publicKey || !storedPublicKey || !storedPrivateKey) {
      return false;
    }
    setLocalPrivateKey(storedPrivateKey);
    setLocalPublicKey(storedPublicKey);

    return storedPublicKey === publicKey;
  }, [userId, publicKey]);

  const generateaAndStoreKeyPair = useCallback(async () => {
    const privateKey = await Crypto.getRandomBytesAsync(32);
    const keyPair = nacl.box.keyPair.fromSecretKey(privateKey);

    await setSecureValue(
      SecureStoreKeys.PRIVATE_KEY,
      toBase64(keyPair.secretKey)
    );
    await setSecureValue(
      SecureStoreKeys.PUBLIC_KEY,
      toBase64(keyPair.publicKey)
    );

    setLocalPrivateKey(toBase64(keyPair.secretKey));
    setLocalPublicKey(toBase64(keyPair.publicKey));

    setServerPublicKey({ data: { publicKey: toBase64(keyPair.publicKey) } });
  }, [userId, setServerPublicKey]);

  const verifyKeyPair = useCallback(async () => {
    if (!(await doesPublicKeyMatch())) {
      await generateaAndStoreKeyPair();
    } else {
    }
  }, [doesPublicKeyMatch, generateaAndStoreKeyPair]);

  const getNonce = () => {
    return Crypto.getRandomBytes(24);
  };

  const encryptMessageAsymmetric = async (
    message: string,
    recipientPublicKey: string
  ) => {
    const nonce = getNonce();

    var byteArrayMessage = nacl.box(
      new Uint8Array(Buffer.from(message)),
      nonce,
      fromBase64(recipientPublicKey),
      fromBase64(localPrivateKey)
    );

    return {
      message: toBase64(byteArrayMessage),
      nonce: toBase64(nonce),
    };
  };

  const decryptMessageAsymmetric = async (
    message: string,
    nonce: string,
    senderPublicKey: string
  ) => {
      const decrypted = nacl.box.open(
        fromBase64(message),
        fromBase64(nonce),
        fromBase64(senderPublicKey),
        fromBase64(localPrivateKey)
      );
    if (!decrypted) throw new Error("Decryption failed");
    return Buffer.from(decrypted).toString();
  };

  return {
    generateaAndStoreKeyPair,
    doesPublicKeyMatch,
    verifyKeyPair,
    localPublicKey,
    localPrivateKey,
    encryptMessageAsymmetric,
    decryptMessageAsymmetric,
  };
};
