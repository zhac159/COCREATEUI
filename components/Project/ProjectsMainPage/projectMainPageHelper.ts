import { ProjectRoleDTO } from "@/common/api/model";

export type SelectedRole = {
  role?: ProjectRoleDTO;
  allRoles?: boolean;
  assetMode?: boolean;
};

export const bannerHeight = 475;