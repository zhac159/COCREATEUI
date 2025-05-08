import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import MessageReaction from "../Common/Messages/MessageReaction";

export const newMessageReactionState = atom<MessageReaction | null>({
  key: "newMessageReactionState",
  default: null,
});

export const useNewMessageReactionValue = () => useRecoilValue(newMessageReactionState);
export const useSetNewMessageReactionState = () => useSetRecoilState(newMessageReactionState);
export const useNewMessageReactionState = () => useRecoilState(newMessageReactionState);