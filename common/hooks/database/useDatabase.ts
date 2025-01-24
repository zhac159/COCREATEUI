import { useAuthStore } from "@/common/stores/authStore/authStore";
import { Message } from "@/common/types/Message";
import { useSQLiteContext } from "expo-sqlite";

const messagesPerQuery = 200;

export const useDatabase = () => {
  const db = useSQLiteContext();
  const userId = useAuthStore((state) => state.auth.userId);

  const addDbMessages = async (messages: Message[]) => {
    const statement = await db.prepareAsync(
      "INSERT INTO messages (userId, id, chatId, senderId, date, content, uri, replyMessageId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    );
    try {
      for (const message of messages) {
        await statement.executeAsync([
          userId,
          message.id,
          message.chatId,
          message.senderId,
          message.date,
          message.content || null,
          message.uri || null,
          message.replyMessageId || null,
        ]);
      }
    } finally {
      await statement.finalizeAsync();
    }

    const enrichedMessages = await enrichMessages(messages);

    return enrichedMessages;
  };

  const getDbMessagesByChat = async () => {
    const chatIdRows = await db.getAllAsync<{ chatId: number }>(
      "SELECT DISTINCT chatId FROM messages WHERE userId = ?",
      [userId]
    );

    const messagesByChat = new Map<number, Message[]>();

    for (const chatIdRow of chatIdRows) {
      const lastFifteen = await db.getAllAsync<Message>(
        `SELECT * FROM messages
         WHERE userId = ? AND chatId = ?
         ORDER BY date DESC
         LIMIT ${messagesPerQuery}`,
        [userId, chatIdRow.chatId]
      );

      const enrinchedMessages = await enrichMessages(lastFifteen);

      messagesByChat.set(chatIdRow.chatId, enrinchedMessages);
    }

    return messagesByChat;
  };

  const getDbMessagesBefore = async (chatId: number, message: Message) => {
    const messages = await db.getAllAsync<Message>(
      `SELECT * FROM messages
       WHERE userId = ? AND chatId = ? AND date < ?
       ORDER BY date DESC
       LIMIT ${messagesPerQuery}`,
      [userId, chatId, message.date]
    );
    return enrichMessages(messages);
  };

  const enrichMessages = async (messages: Message[]) => {
    const replyMessageIds = messages
      .filter((m) => m.replyMessageId)
      .map((m) => m.replyMessageId!);

    const replyMessages = await db.getAllAsync<Message>(
      `SELECT * FROM messages
       WHERE userId = ? AND id IN (${replyMessageIds
         .map(() => "?")
         .join(",")})`,
      [userId, ...replyMessageIds]
    );

    return messages.map((message) => {
      if (message.replyMessageId) {
        message.replyMessage = replyMessages.find(
          (replyMessage) => replyMessage.id === message.replyMessageId
        );
      }
      return message;
    });
  };

  return {
    addDbMessages,
    getDbMessagesByChat,
    getDbMessagesBefore,
  };
};
