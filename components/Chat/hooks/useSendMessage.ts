import { useChat } from "@/common/contexts/ChatProvider";
import { useConnectionContext } from "@/common/contexts/ConnectionProvider";
import { useEncryption } from "@/common/hooks/encryption/useEncryption";
import { WebSocketInvocations } from "@/common/constants/webSocketInvocations";
import { useDecomposeChat } from "./useDecomposeChat";
import { useMessagesStore } from "@/common/stores/messagesStore";
import { useDatabase } from "@/common/hooks/database/useDatabase";
import { Message } from "@/common/types/Message";
import { useAuthStore } from "@/common/stores/authStore/authStore";
import { MessageCreateDTO } from "@/api/model";

export const useSendMessage = () => {
  const userId = useAuthStore((state) => state.auth.userId);
  const addMessages = useMessagesStore((state) => state.addMessages);

  const { chat, symmetricKey } = useChat();

  const { addDbMessages } = useDatabase();
  const { sendWebSocketMessage } = useConnectionContext();
  const { encryptSymmetricMessage, getRandomUUID } = useEncryption();

  const { memberIds } = useDecomposeChat(chat);

  const sendMessage = async (message: string, replyMessage: Message | null) => {
    const { cipher, salt } = await encryptSymmetricMessage(
      message,
      symmetricKey
    );

    const messageToSend: MessageCreateDTO = {
      chatId: chat.id,
      date: new Date().toISOString(),
      id: await getRandomUUID(),
      replyMessageId: replyMessage?.id || null,
      salt: salt,
      targetUserIds: memberIds,
      content: cipher,
      uri: null,
    };
    sendWebSocketMessage(WebSocketInvocations.SendMessageAsync, messageToSend);

    const messageToStore: Message = {
      chatId: chat.id,
      date: messageToSend.date,
      id: messageToSend.id,
      content: message,
      senderId: userId,
      replyMessageId: replyMessage?.id,
    };

    const enrichedMessages = await addDbMessages([messageToStore]);
    addMessages(enrichedMessages);
  };

  return sendMessage;
};
