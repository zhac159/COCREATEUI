import { useChat } from "@/common/contexts/ChatProvider";
import { useConnectionContext } from "@/common/contexts/ConnectionProvider";
import { useEncryption } from "@/common/hooks/encryption/useEncryption";
import { WebSocketInvocations } from "@/common/constants/webSocketInvocations";
import { useMessagesStore } from "@/common/stores/messagesStore";
import { useDatabase } from "@/common/hooks/database/useDatabase";
import { Message } from "@/common/types/Message";
import { useAuthStore } from "@/common/stores/authStore/authStore";
import { MessageCreateDTO } from "@/api/model";

export const useSendMessage = () => {
  const userId = useAuthStore((state) => state.auth.userId);
  const addMessages = useMessagesStore((state) => state.addMessages);

  const { chat, symmetricKey, memberIds } = useChat();

  const { addDbMessages } = useDatabase();
  const { sendWebSocketMessage } = useConnectionContext();
  const { encryptSymmetricMessage, getRandomUUID } = useEncryption();

  const sendMessage = async (message: string, replyMessage: Message | null) => {
    const messageToStore: Message = {
      chatId: chat.id,
      date: new Date().toISOString(),
      id: await getRandomUUID(),
      content: message,
      senderId: userId,
      replyMessageId: replyMessage?.id,
    };

    const { cipher, salt } = await encryptSymmetricMessage(
      message,
      symmetricKey
    );

    const enrichedMessages = await addDbMessages([messageToStore]);
    addMessages(enrichedMessages);

    const messageToSend: MessageCreateDTO = {
      chatId: chat.id,
      date: messageToStore.date,
      id: messageToStore.id,
      replyMessageId: replyMessage?.id || null,
      salt: salt,
      targetUserIds: memberIds.filter((id) => id !== userId),
      content: cipher,
      uri: null,
    };
    sendWebSocketMessage(WebSocketInvocations.SendMessageAsync, messageToSend);
  };

  return sendMessage;
};
