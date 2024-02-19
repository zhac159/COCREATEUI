import { AssetDTO, PortofolioContentDTO, UserDTO } from "@/common/api/model";
import {
  DefaultValue,
  atom,
  selectorFamily,
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

export const useSetCurrentUserState = () => useSetRecoilState(currentUserState);
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

export const usePortfolioContentsValue = () =>
  useRecoilValue(portfolioContentsSelector);

export const useSetPortfolioContentsState = () =>
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

export const useSkillsValue = () => useRecoilValue(skillsSelector);
export const useSetSkillsState = () => useSetRecoilState(skillsSelector);
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

export const useAssetsValue = () => useRecoilValue(assetsSelector);
export const useSetAssetsState = () => useSetRecoilState(assetsSelector);
export const useAssetsState = () => useRecoilState(assetsSelector);

export const assetByIdSelector = selectorFamily({
  key: 'assetByIdSelector',
  get: (id) => ({ get }) => {
    const user = get(currentUserState);
    if (user && user.assets) {
    
    return user?.assets.find(asset => asset.id === id);
    }
    else return null;
  },
  set: (id) => ({ set, get }, newValue) => {
    const user = get(currentUserState);
    if (user && user.assets) {
      const newAssets = user.assets.map(asset =>
        asset.id === id && !(newValue instanceof DefaultValue)
          ? newValue
          : asset
      );
      set(currentUserState, {
        ...user,
        assets: newAssets.filter((asset): asset is AssetDTO => asset !== null && asset !== undefined),
      });
    }
  },
});

export const useAssetByIdValue = (id: number) => useRecoilValue(assetByIdSelector(id));
export const useSetAssetByIdState = (id: number) => useSetRecoilState(assetByIdSelector(id));
export const useAssetByIdState = (id: number) => useRecoilState(assetByIdSelector(id));

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

export const useAddressValue = () => useRecoilValue(addressSelector);
export const useSetAddressState = () => useSetRecoilState(addressSelector);
export const useAddressState = () => useRecoilState(addressSelector);

// about you selector 

export const aboutYouSelector = selector({
  key: "aboutYouSelector",
  get: ({ get }) => {
    const user = get(currentUserState);
    return user?.aboutYou;
  },
  set: ({ set, get }, newValue) => {
    const user = get(currentUserState);
    if (user) {
      set(currentUserState, {
        ...user,
        aboutYou: newValue instanceof DefaultValue ? null : newValue,
      });
    }
  },
});

export const useAboutYouValue = () => useRecoilValue(aboutYouSelector);
export const useSetAboutYouState = () => useSetRecoilState(aboutYouSelector);
export const useAboutYouState = () => useRecoilState(aboutYouSelector);