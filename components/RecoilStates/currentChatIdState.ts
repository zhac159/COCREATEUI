import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { ChatType } from "../Chats/ChatHelper";

type ChatTypeIdPair = {
  chatId: number;
  chatType: ChatType;
};

export const currentChatIdState = atom<ChatTypeIdPair>({
  key: "currentChatIdState",
  default: {
    chatId: 0,
    chatType: 0,
  },
});

export const useCurrentChatIdState = () => useRecoilState(currentChatIdState);
export const useCurrentChatIdValue = () => useRecoilValue(currentChatIdState);
export const useSetCurrentChatIdState = () =>
  useSetRecoilState(currentChatIdState);
