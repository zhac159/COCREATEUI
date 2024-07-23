import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

export type DiscoveryFilters = {
  maxDistance: number;
  minCreditOffer: number;
  maxWorkCommitment: number;
};

export const currentChatDataState = atom<DiscoveryFilters>({
  key: "discoveryFiltersState",
  default: {
    maxDistance: 40,
    minCreditOffer: 1,
    maxWorkCommitment: 200,
  },
});

export const useDiscoveryFilters = () => {
  return useRecoilState(currentChatDataState);
};
export const useDiscoveryFiltersValue = () => {
  return useRecoilValue(currentChatDataState);
};
export const useSetDiscoveryFilters = () => {
  return useSetRecoilState(currentChatDataState);
};
