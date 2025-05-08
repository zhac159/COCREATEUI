import { AssetDTO } from "@/common/api/model";
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

export type InterestedAsset = {
    asset: AssetDTO;
    projectId: number;
};


export const interestedAssetState = atom<InterestedAsset | null>({
    key: "interestedAssetState",
    default: null,
});

export const useInterestedAssetState = () => useRecoilState(interestedAssetState);
export const useInterestedAssetValue = () => useRecoilValue(interestedAssetState);
export const useSetInterestedAssetState = () => useSetRecoilState(interestedAssetState);