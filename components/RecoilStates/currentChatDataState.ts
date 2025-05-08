import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { ChatMember, ChatTypeIdPair } from "../Chats/chatHelper";
import { AssetOfferDTO, EnquiryDTO, ProjectDTO} from "@/common/api/model";
import ChatType from "@/common/chat/chatType";

export type CurrentChatData = {
  chatType: ChatType;
  chatId: string;
  chatName: string;
  colors: string[];
  enquiryInformation?: EnquiryDTO;
  projectInformation?: ProjectDTO;
  assetOfferInformation?: AssetOfferDTO;
  projectId?: number;
  chatMembers: ChatMember[];
  targetPublicKey?: string | null;
};

export const currentChatDataState = atom<CurrentChatData>({
  key: "currentChatDataState",
  default: {
    colors: [],
    chatId: "1",
    chatType: 0,
    chatName: "",
    chatMembers: [],
  },
});

export const useCurrentChatDataState = () =>
  useRecoilState(currentChatDataState);
export const useCurrentChatDataValue = () =>
  useRecoilValue(currentChatDataState);
export const useSetCurrentChatDataState = () =>
  useSetRecoilState(currentChatDataState);
