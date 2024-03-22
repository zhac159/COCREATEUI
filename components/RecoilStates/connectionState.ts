import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { HubConnection } from "@microsoft/signalr";

export const connectionState = atom<HubConnection | null>({
    key: "connectionState",
    default: null,
    });

export const useConnectionState = () => useRecoilState(connectionState);
export const useConnectionValue = () => useRecoilValue(connectionState);
export const useSetConnectionState = () => useSetRecoilState(connectionState);