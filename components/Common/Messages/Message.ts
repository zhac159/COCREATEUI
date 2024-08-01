import { ChatType, MediaType } from "@/common/api/model";
import MessageReaction from "./MessageReaction";

type Message = {
  content?: string | null;
  chatId: string;
  date: string;
  id: string;
  mediaType?: MediaType | null;
  replyMessageId?: string | null;
  senderId: number;
  targetId: number;
  uri?: string | null;
  replyMessage?: Message | null;
  reactions?: MessageReaction[] | null;
};

export default Message;
