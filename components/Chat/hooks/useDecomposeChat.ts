import { ChatDTO } from "@/api/model";

export const useDecomposeChat = (chat: ChatDTO) => {
  const memberIds = chat.chatMembers.map((member) => member.userId);

  return {
    memberIds,
  };
};
