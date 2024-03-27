import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

export type MediaViewerState = {
  visible: boolean;
  uris: string[];
  selectedImageIndex: number;
};

export const mediaViewerState = atom<MediaViewerState>({
  key: "mediaViewerState",
  default: {
    visible: false,
    uris: [],
    selectedImageIndex: 0,
  },
});

export const useMediaViewerState = () => useRecoilState(mediaViewerState);
export const useMediaViewerValue = () => useRecoilValue(mediaViewerState);
export const useSetMediaViewerState = () => useSetRecoilState(mediaViewerState);
