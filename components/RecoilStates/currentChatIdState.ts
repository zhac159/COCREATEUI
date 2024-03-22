import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

export const currentChatIdState = atom<number>({
    key: "currentChatIdState",
    default: 0,
    });

export const useCurrentChatIdState = () => useRecoilState(currentChatIdState);
export const useCurrentChatIdValue = () => useRecoilValue(currentChatIdState);
export const useSetCurrentChatIdState = () => useSetRecoilState(currentChatIdState);
