import { atom, useSetRecoilState } from "recoil";
import { MessageDTO } from "@/common/api/model";

export const newMessageState = atom<MessageDTO | undefined>({
  key: "newMessageState",
  default: undefined,
});

export const useNewMessageState = () => useSetRecoilState(newMessageState);
export const useNewMessageValue = () => useSetRecoilState(newMessageState);
export const useSetNewMessageState = () => useSetRecoilState(newMessageState);
