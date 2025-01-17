import { createContext, useContext, useEffect } from "react";
import { useAsymmetricKeyExchange } from "../hooks/encryption/useAsymmetricKeyExchange";

type AsymmetricKeyContextType = {
  publicKey: string;
  privateKey: string;
  encryptMessageAsymmetric: (
    message: string,
    recipientPublicKey: string
  ) => Promise<{
    message: string;
    nonce: string;
  }>;
};

export const AsymmetricKeyContext =
  createContext<AsymmetricKeyContextType | null>(null);

export const useAsymmetricKey = () => {
  const context = useContext(AsymmetricKeyContext);
  if (!context) {
    throw new Error(
      "useAsymmetricKey must be used within AsymmetricKeyProvider"
    );
  }
  return context;
};

export function AsymmetricKeyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    verifyKeyPair,
    localPrivateKey,
    localPublicKey,
    encryptMessageAsymmetric,
  } = useAsymmetricKeyExchange();

  useEffect(() => {
    (async () => {
      await verifyKeyPair();
    })();
  }, [verifyKeyPair]);

  return (
    <AsymmetricKeyContext.Provider
      value={{
        publicKey: localPublicKey,
        privateKey: localPrivateKey,
        encryptMessageAsymmetric,
      }}
    >
      {children}
    </AsymmetricKeyContext.Provider>
  );
}

export const useKeys = () => {
  const context = useContext(AsymmetricKeyContext);
  if (!context) {
    throw new Error("useKeys must be used within AsymmetricKeyProvider");
  }
  return context;
};
