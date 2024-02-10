/**
 * Generated by orval v6.24.0 🍺
 * Do not edit manually.
 * CoCreateAPI
 * OpenAPI spec version: v1
 */
import type { UserInformationDTO } from './userInformationDTO';
import type { ProjectRoleDTO } from './projectRoleDTO';

export interface ProjectDTO {
  description?: string | null;
  id?: number;
  name?: string | null;
  projectManager?: UserInformationDTO;
  projectRoles?: ProjectRoleDTO[] | null;
  uris?: string[] | null;
}
