import { ChatDTO } from "@/api/model";
import { ChatType } from "../constants/skill/chatType";
import { useAuthStore } from "../stores/authStore";

  export const getChatId = (createKeyExchange: ChatDTO) => {

    const userId = useAuthStore.getState().auth.userId;
    
    if (createKeyExchange.chatType === ChatType.Project) {
      return `${createKeyExchange.chatType}-${createKeyExchange.chatTypeId}`;
    }
    if (userId < createKeyExchange.chatMembers[0].userId) {
      return `${createKeyExchange.chatType}-${createKeyExchange.chatTypeId}-${userId}-${createKeyExchange.chatMembers[0].userId}`;
    }
    return `${createKeyExchange.chatType}-${createKeyExchange.chatTypeId}-${createKeyExchange.chatMembers[0].userId}-${userId}`;
  };
