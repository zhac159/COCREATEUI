import { ProjectCreateDTO } from "@/common/api/model";
import { atom, useSetRecoilState } from "recoil";

export const newProjectState = atom<ProjectCreateDTO | undefined>({
  key: "newProjectState",
  default: undefined,
});

export const useNewProjectState = () => useSetRecoilState(newProjectState);
export const useNewProjectValue = () => useSetRecoilState(newProjectState);
export const useSetNewProjectState = () => useSetRecoilState(newProjectState);
