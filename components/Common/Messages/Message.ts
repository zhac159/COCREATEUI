import { ChatType, MediaType } from "@/common/api/model";

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
};

export default Message;
