import { useChat } from "@/common/contexts/ChatProvider";
import { useConnectionContext } from "@/common/contexts/ConnectionProvider";
import { useEncryption } from "@/common/hooks/encryption/useEncryption";
import { WebSocketInvocations } from "@/common/constants/webSocketInvocations";
import { useDecomposeChat } from "./useDecomposeChat";

export const useSendMessage = () => {
  const { chat, symmetricKey } = useChat();
  const { sendWebSocketMessage } = useConnectionContext();
  const { encryptSymmetricMessage, getRandomUUID } = useEncryption();
  const { memberIds } = useDecomposeChat(chat);

  const sendMessage = async (message: string) => {
    const { cipher, salt } = await encryptSymmetricMessage(
      message,
      symmetricKey
    );
    sendWebSocketMessage(WebSocketInvocations.SendMessageAsync, {
      chatId: chat.id,
      content: cipher,
      date: new Date().toISOString(),
      id: await getRandomUUID(),
      replyMessageId: null,
      salt: salt,
      targetUserIds: memberIds,
      uri: null,
    });
  };

  return sendMessage;
};
