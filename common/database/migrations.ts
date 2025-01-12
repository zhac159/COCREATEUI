import { SQLiteDatabase } from "expo-sqlite";

const migration1 = `
  CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY NOT NULL,
    chatId TEXT NOT NULL,
    date TEXT NOT NULL,
    senderId INTEGER NOT NULL,
    content TEXT,
    uri TEXT,
    mediaType INTEGER,
    replyMessageId TEXT
  );

  CREATE INDEX IF NOT EXISTS idx_messages_chatId ON messages (chatId);
  CREATE INDEX IF NOT EXISTS idx_messages_date ON messages (date DESC);

  CREATE TABLE IF NOT EXISTS messageReactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    messageId TEXT NOT NULL,
    reaction INTEGER NOT NULL,
    userId INTEGER NOT NULL,
    multiplier INTEGER NOT NULL DEFAULT 1,
    FOREIGN KEY (messageId) REFERENCES messages(id)
  );

  CREATE INDEX IF NOT EXISTS idx_messageReactions_messageId ON messageReactions (messageId);
`;

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 1;

  const result = await db.getFirstAsync<{ user_version: number }>(
    "PRAGMA user_version"
  );

  let currentDbVersion = result ? result.user_version : 0;

  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }

  if (currentDbVersion === 0) {
    await db.execAsync(migration1);
    currentDbVersion = 1;
  }

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}
