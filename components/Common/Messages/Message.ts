import { ChatType, MediaType } from "@/common/api/model";
import MessageReaction from "./MessageReaction";

type Message = {
  chatType?: ChatType;
  content?: string | null;
  date?: string;
  id?: string;
  mediaType?: MediaType;
  replyMessageId?: string | null;
  senderId?: number;
  targetId?: number;
  uri?: string | null;
  replyMessage?: Message;
  reactions?: MessageReaction[];
};

export default Message;
