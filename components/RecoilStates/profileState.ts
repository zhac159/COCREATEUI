import {
  AssetDTO,
  EnquiryDTO,
  PortofolioContentDTO,
  UserDTO,
} from "@/common/api/model";
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
    projects: [],
    rating: 0,
    skills: [],
    enquiries: [],
    totalReviews: 0,
    userId: 0,
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

export const portofolioContentByIdSelector = selectorFamily({
  key: "portofolioContentByIdSelector",
  get:
    (id: number) =>
    ({ get }) => {
      const user = get(currentUserState);
      if (user && user.portofolioContents) {
        return user?.portofolioContents.find(
          (portofolioContent) => portofolioContent.id === id
        );
      }
    },
  set:
    (id: number) =>
    ({ set, get }, newValue) => {
      const user = get(currentUserState);
      if (user && user.portofolioContents) {
        const newPortofolioContents = user.portofolioContents.map(
          (portofolioContent) =>
            portofolioContent.id === id && !(newValue instanceof DefaultValue)
              ? newValue
              : portofolioContent
        );
        set(currentUserState, {
          ...user,
          portofolioContents: newPortofolioContents.filter(
            (portofolioContent): portofolioContent is PortofolioContentDTO =>
              portofolioContent !== null && portofolioContent !== undefined
          ),
        });
      }
    },
});

export const usePortofolioContentByIdValue = (id: number) =>
  useRecoilValue(portofolioContentByIdSelector(id));

export const useSetPortofolioContentByIdState = (id: number) =>
  useSetRecoilState(portofolioContentByIdSelector(id));

export const usePortofolioContentByIdState = (id: number) =>
  useRecoilState(portofolioContentByIdSelector(id));

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
  key: "assetByIdSelector",
  get:
    (id) =>
    ({ get }) => {
      const user = get(currentUserState);
      if (user && user.assets) {
        return user?.assets.find((asset) => asset.id === id);
      } else return null;
    },
  set:
    (id) =>
    ({ set, get }, newValue) => {
      const user = get(currentUserState);
      if (user && user.assets) {
        const newAssets = user.assets.map((asset) =>
          asset.id === id && !(newValue instanceof DefaultValue)
            ? newValue
            : asset
        );
        set(currentUserState, {
          ...user,
          assets: newAssets.filter(
            (asset): asset is AssetDTO => asset !== null && asset !== undefined
          ),
        });
      }
    },
});

export const useAssetByIdValue = (id: number) =>
  useRecoilValue(assetByIdSelector(id));
export const useSetAssetByIdState = (id: number) =>
  useSetRecoilState(assetByIdSelector(id));
export const useAssetByIdState = (id: number) =>
  useRecoilState(assetByIdSelector(id));

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

export const projectSelector = selector({
  key: "projectSelector",
  get: ({ get }) => {
    const user = get(currentUserState);
    return user?.projects;
  },
  set: ({ set, get }, newValue) => {
    const user = get(currentUserState);
    if (user) {
      set(currentUserState, {
        ...user,
        projects: newValue instanceof DefaultValue ? [] : newValue,
      });
    }
  },
});

export const useProjectValue = () => useRecoilValue(projectSelector);
export const useSetProjectState = () => useSetRecoilState(projectSelector);
export const useProjectState = () => useRecoilState(projectSelector);

//coins selector

export const coinsSelector = selector({
  key: "coinsSelector",
  get: ({ get }) => {
    const user = get(currentUserState);
    return user?.coins;
  },
  set: ({ set, get }, newValue) => {
    const user = get(currentUserState);
    if (user) {
      set(currentUserState, {
        ...user,
        coins: newValue instanceof DefaultValue ? 0 : newValue,
      });
    }
  },
});

export const useCoinsValue = () => useRecoilValue(coinsSelector);
export const useSetCoinsState = () => useSetRecoilState(coinsSelector);
export const useCoinsState = () => useRecoilState(coinsSelector);

export const projectRoleEnquiriesByIdSelector = selectorFamily<
  EnquiryDTO | undefined,
  number
>({
  key: "projectRoleEnquiriesByIdSelector",
  get:
    (enquiryId) =>
    ({ get }) => {
      const user = get(currentUserState);
      const enquiries =
        user?.projects
          ?.flatMap((project) => project.projectRoles)
          ?.filter(Boolean)
          .flatMap((role) => role?.enquiries)
          ?.filter(Boolean) || [];
      return (
        enquiries.find((enquiry) => enquiry && enquiry.id === enquiryId) ||
        undefined
      );
    },
  set:
    (enquiryId) =>
    ({ set, get }, newValue) => {
      const user = get(currentUserState);
      if (user && user.projects) {
        const newProjects = user.projects.map((project) => {
          const newProjectRoles = project.projectRoles.map((projectRole) => {
            const newEnquiries = projectRole.enquiries.map((enquiry) => {
              if (enquiry.id === enquiryId) {
                return newValue instanceof DefaultValue ? undefined : newValue;
              }
              return enquiry;
            });
            return {
              ...projectRole,
              enquiries: newEnquiries.filter(Boolean) as EnquiryDTO[],
            };
          });
          return {
            ...project,
            projectRoles: newProjectRoles,
          };
        });
        set(currentUserState, {
          ...user,
          projects: newProjects,
        });
      }
    },
});

export const useProjectRoleEnquiriesByIdValue = (enquiryId: number) =>
  useRecoilValue(projectRoleEnquiriesByIdSelector(enquiryId));

export const useSetProjectRoleEnquiriesByIdState = (enquiryId: number) =>
  useSetRecoilState(projectRoleEnquiriesByIdSelector(enquiryId));

export const useProjectRoleEnquiriesByIdState = (enquiryId: number) =>
  useRecoilState(projectRoleEnquiriesByIdSelector(enquiryId));

export const userIdSelector = selector({
  key: "userIdSelector",
  get: ({ get }) => {
    const user = get(currentUserState);
    return user?.userId;
  },
  set: ({ set, get }, newValue) => {
    const user = get(currentUserState);
    if (user) {
      set(currentUserState, {
        ...user,
        userId: newValue instanceof DefaultValue ? 0 : newValue,
      });
    }
  },
});

export const useUserIdValue = () => useRecoilValue(userIdSelector);
export const useSetUserIdState = () => useSetRecoilState(userIdSelector);
export const useUserIdState = () => useRecoilState(userIdSelector);

export const enquiriesByIdSelector = selectorFamily<
  EnquiryDTO | undefined,
  number
>({
  key: "enquiriesByIdSelector",
  get:
    (enquiryId) =>
    ({ get }) => {
      const user = get(currentUserState);
      if (!user || !user.enquiries) return;
      return (
        user.enquiries.find((enquiry) => enquiry.id === enquiryId) || undefined
      );
    },
  set:
    (enquiryId) =>
    ({ set, get }, newValue) => {
      const user = get(currentUserState);
      if (user && user.enquiries) {
        const newEnquiries = user.enquiries.map((enquiry) => {
          if (enquiry.id === enquiryId) {
            return newValue instanceof DefaultValue ? undefined : newValue;
          }
          return enquiry;
        });
        set(currentUserState, {
          ...user,
          enquiries: newEnquiries.filter(Boolean) as EnquiryDTO[],
        });
      }
    },
});

export const useEnquiriesByIdValue = (enquiryId: number) =>
  useRecoilValue(enquiriesByIdSelector(enquiryId));

export const useSetEnquiriesByIdState = (enquiryId: number) =>
  useSetRecoilState(enquiriesByIdSelector(enquiryId));

export const useEnquiriesByIdState = (enquiryId: number) =>
  useRecoilState(enquiriesByIdSelector(enquiryId));

export const getIntUserIdSelector = selector({
  key: "getIntUserIdSelector",
  get: ({ get }) => {
    const user = get(currentUserState);
    return user?.userId;
  },
});

export const useGetIntUserIdValue = () => useRecoilValue(getIntUserIdSelector);


// enqruiries selector 

export const enquiriesSelector = selector({
  key: "enquiriesSelector",
  get: ({ get }) => {
    const user = get(currentUserState);
    return user?.enquiries;
  },
  set: ({ set, get }, newValue) => {
    const user = get(currentUserState);
    if (user) {
      set(currentUserState, {
        ...user,
        enquiries: newValue instanceof DefaultValue ? [] : newValue,
      });
    }
  },
});

export const useEnquiriesValue = () => useRecoilValue(enquiriesSelector);
export const useSetEnquiriesState = () => useSetRecoilState(enquiriesSelector);
export const useEnquiriesState = () => useRecoilState(enquiriesSelector);