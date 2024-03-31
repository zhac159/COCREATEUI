import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { ChatType } from "../Chats/ChatHelper";

type ChatTypeIdPair = {
  chatTargetId: number;
  chatType: ChatType;
};

export const currentChatTargetIdState = atom<ChatTypeIdPair>({
  key: "currentChatTargetIdState",
  default: {
    chatTargetId: 0,
    chatType: 0,
  },
});

export const useCurrentChatTargetIdState = () => useRecoilState(currentChatTargetIdState);
export const useCurrentChatTargetIdValue = () => useRecoilValue(currentChatTargetIdState);
export const useSetCurrentChatTargetIdState = () =>
  useSetRecoilState(currentChatTargetIdState);
