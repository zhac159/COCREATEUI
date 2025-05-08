import { Emoji } from "@/assets/emojis/emojisHelper";

type MessageReaction = {
  messageId: string;
  reaction: Emoji;
  userId?: number;
  multiplier: number;
};

export default MessageReaction;
