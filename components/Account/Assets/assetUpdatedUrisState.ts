import { atom } from "recoil";

type AssetUpdatedUris = {
    [key: string]: string[];
};
    

export const currentUserState = atom<UserDTO | undefined>({
