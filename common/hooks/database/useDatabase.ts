import { useAuthStore } from "@/common/stores/authStore/authStore";
import { Message } from "@/common/types/Message";
import { useSQLiteContext } from "expo-sqlite";

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
  };

  const getDbMessages = async (chatId: string) => {
    const messages = await db.getAllAsync<Message>("SELECT * FROM messages");
    return messages;
  };

  return {
    addDbMessages,
    getDbMessages,
  };
};
