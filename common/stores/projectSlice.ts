import { ProjectInfoDTO } from "@/api/model";
import { StateCreator } from "zustand";
import { produce } from "immer";
import { AuthState } from "./authTypes";

export interface ProjectSlice {
  getProjectById: (id: number) => ProjectInfoDTO | undefined;
  updateProjectById: (id: number, updates: Partial<ProjectInfoDTO>) => void;
  removeProject: (id: number) => void;
  addProject: (project: ProjectInfoDTO) => void;
}

export const createProjectSlice: StateCreator<
  AuthState & ProjectSlice,
  [],
  [],
  ProjectSlice
> = (set, get) => ({
  getProjectById: (id) =>
    get().auth.projectsManaging.find((project) => project.id === id),

  removeProject: (id) =>
    set(
      produce((state) => {
        state.auth.projectsManaging = state.auth.projectsManaging.filter(
          (p: ProjectInfoDTO) => p.id !== id
        );
      })
    ),

  updateProjectById: (id, updates) =>
    set(
      produce((state) => {
        const projectIndex = state.auth.projectsManaging.findIndex(
          (p: ProjectInfoDTO) => p.id === id
        );
        if (projectIndex !== -1) {
          state.auth.projectsManaging[projectIndex] = {
            ...state.auth.projectsManaging[projectIndex],
            ...updates,
          };
        }
      })
    ),

  addProject: (project) =>
    set(
      produce((state) => {
        state.auth.projectsManaging.push(project);
      })
    ),
});
