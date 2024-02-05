import { PortofolioContentDTO, UserDTO } from "@/common/api/model";
import { DefaultValue, atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { selector } from "recoil";

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

export const useSetCurrentUser = () => useSetRecoilState(currentUserState);
export const useCurrentUserValue = () => useRecoilValue(currentUserState);

export const portfolioContentsSelector = selector<
  PortofolioContentDTO[] | null | undefined
>({
  key: "portfolioContentsSelector",
  get: ({ get }) => {
    const user = get(currentUserState);
    return user?.portofolioContents;
  },
  set: ({ set, get }, newValue) => {
    const user = get(currentUserState);
    if (user) {
      set(currentUserState, {
        ...user,
        portofolioContents: newValue instanceof DefaultValue ? [] : newValue,
      });
    }
  },
});
export const skillsSelector = selector({
  key: "skillsSelector",
  get: ({ get }) => {
    const user = get(currentUserState);
    return user?.skills;
  },
});

export const assetsSelector = selector({
  key: "assetsSelector",
  get: ({ get }) => {
    const user = get(currentUserState);
    return user?.assets;
  },
});

export const usePortfolioContents = () =>
  useRecoilValue(portfolioContentsSelector);

export const useSetPortfolioContents = () =>
  useSetRecoilState(portfolioContentsSelector);

export const usePortfolioContentsState = () =>
  useRecoilState(portfolioContentsSelector);
