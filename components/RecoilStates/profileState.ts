import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { PortofolioContentDTO, UserDTO } from "./../../httpClient";

export type User = {
  aboutYou: string | null;
  assets: string[];
  bannerPictureSrc: string | null;
  coins: number;
  email: string;
  location: string;
  portofolioContents: Array<PortofolioContentDTO>;
  profilePictureSrc: string | null;
  rating: number;
  reviewsGiven: string[];
  reviewsReceived: string[];
  skills: string[];
  totalReviews: number;
  userId: number;
  username: string;
};

export const currentUserState = atom<UserDTO | undefined>({
  key: "userState",
  default: {
    aboutYou: null,
    assets: [],
    bannerPictureSrc: null,
    coins: 0,
    email: "testsssse3mrail@gmail.com",
    location: "string",
    portofolioContents: [],
    profilePictureSrc: null,
    rating: 0,
    reviewsGiven: [],
    reviewsReceived: [],
    skills: [],
    totalReviews: 0,
    userId: 4,
    username: "nikolas",
  },
});

// Path: components/RecoilStates/profileState.ts

export const useSetCurrentUser = () => useSetRecoilState(currentUserState);
export const useCurrentUserValue = () => useRecoilValue(currentUserState);
