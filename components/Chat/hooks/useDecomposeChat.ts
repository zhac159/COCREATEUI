import { ChatDTO, ChatMemberDTO } from "@/api/model";

export const useDecomposeChat = (chat: ChatDTO) => {

  const memberIds = chat.chatMembers.map((member) => member.userId);

  const userIdToMember = chat.chatMembers.reduce((acc, member) => {
    acc.set(member.userId, member);
    return acc;
  }, new Map<number, ChatMemberDTO>());

  return {
    memberIds,
    userIdToMember,
  };
};