import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { ChatMember, ChatTypeIdPair } from "../Chats/chatHelper";
import { AssetOfferDTO, EnquiryDTO, ProjectDTO} from "@/common/api/model";

export type CurrentChatData = {
  chatTypeIdPair: ChatTypeIdPair;
  chatName: string;
  colors: string[];
  enquiryInformation?: EnquiryDTO;
  projectInformation?: ProjectDTO;
  assetOfferInformation?: AssetOfferDTO;
  projectId?: number;
  chatMembers?: ChatMember[];
  targetPublicKey?: string | null;
};

export const currentChatDataState = atom<CurrentChatData>({
  key: "currentChatDataState",
  default: {
    colors: [],
    chatName: "",
    chatTypeIdPair: {
      chatTargetId: 0,
      chatType: 0,
    },
  },
});

export const useCurrentChatDataState = () =>
  useRecoilState(currentChatDataState);
export const useCurrentChatDataValue = () =>
  useRecoilValue(currentChatDataState);
export const useSetCurrentChatDataState = () =>
  useSetRecoilState(currentChatDataState);
