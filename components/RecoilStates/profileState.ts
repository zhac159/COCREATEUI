import { PortofolioContentDTO, UserDTO } from "@/common/api/model";
import {
  DefaultValue,
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { selector } from "recoil";

export const currentUserState = atom<UserDTO | undefined>({
  key: "userState",
  default: {
    aboutYou: null,
    assets: [],
    bannerPictureSrc: null,
    coins: 0,
    email: "testsssse3mrail@gmail.com",
    address: null,
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

export const usePortfolioContents = () =>
  useRecoilValue(portfolioContentsSelector);

export const useSetPortfolioContents = () =>
  useSetRecoilState(portfolioContentsSelector);

export const usePortfolioContentsState = () =>
  useRecoilState(portfolioContentsSelector);

export const skillsSelector = selector({
  key: "skillsSelector",
  get: ({ get }) => {
    const user = get(currentUserState);
    return user?.skills;
  },
  set: ({ set, get }, newValue) => {
    const user = get(currentUserState);
    if (user) {
      set(currentUserState, {
        ...user,
        skills: newValue instanceof DefaultValue ? [] : newValue,
      });
    }
  },
});

export const useSkills = () => useRecoilValue(skillsSelector);
export const useSetSkills = () => useSetRecoilState(skillsSelector);
export const useSkillsState = () => useRecoilState(skillsSelector);

export const assetsSelector = selector({
  key: "assetsSelector",
  get: ({ get }) => {
    const user = get(currentUserState);
    return user?.assets;
  },
  set: ({ set, get }, newValue) => {
    const user = get(currentUserState);
    if (user) {
      set(currentUserState, {
        ...user,
        assets: newValue instanceof DefaultValue ? [] : newValue,
      });
    }
  },
});

export const useAssets = () => useRecoilValue(assetsSelector);
export const useSetAssets = () => useSetRecoilState(assetsSelector);
export const useAssetsState = () => useRecoilState(assetsSelector);


export const addressSelector = selector({
  key: "addressSelector",
  get: ({ get }) => {
    const user = get(currentUserState);
    return user?.address;
  },
  set: ({ set, get }, newValue) => {
    const user = get(currentUserState);
    if (user) {
      set(currentUserState, {
        ...user,
        address: newValue instanceof DefaultValue ? null : newValue,
      });
    }
  },
});

export const useAddress = () => useRecoilValue(addressSelector);
export const useSetAddress = () => useSetRecoilState(addressSelector);
export const useAddressState = () => useRecoilState(addressSelector);