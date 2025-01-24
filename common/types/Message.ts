export type Message = {
  id: string;
  chatId: number;
  senderId: number;
  date: string;
  content?: string;
  uri?: string;
  replyMessageId?: string;
  replyMessage?: Message;
};
