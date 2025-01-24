import { Message } from "@/common/types/Message";

export const useMessageBubbleHelpers = () => {
  const shouldDateMoveDown = (message: Message) => {
    return (message.content?.length ?? 0) > 20;
  };

  return {
    shouldDateMoveDown,
  };
};
