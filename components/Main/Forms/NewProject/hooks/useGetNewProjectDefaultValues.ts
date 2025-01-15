import { ProjectCreateDTO, ProjectRoleCreateDTO } from "@/api/model";

export const useGetNewProjectDefaultValues = () => {
  const defaultRole: ProjectRoleCreateDTO = {
    cost: 0,
    description: "",
    name: "",
    remote: false,
    skillType: 1,
  };
  const defaultProject: ProjectCreateDTO = {
    date: new Date().toISOString(),
    description: "",
    location: {
      address: "London, UK",
      latitude: 51.5072178,
      longitude: -0.1275862,
    },
    medias: [],
    name: "",
    projectRoles: [defaultRole],
  };

  return { defaultProject, defaultRole };
};
