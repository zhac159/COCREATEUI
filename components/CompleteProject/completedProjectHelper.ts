import { ProjectDTO, ProjectRoleDTO, UserInformationDTO } from "@/common/api/model";

export const getAssignees = (project: ProjectDTO): UserInformationDTO[] => {
  var assignees: UserInformationDTO[] = [];

  if (project.projectRoles) {
    project.projectRoles.forEach((role) => {
      if (role.assignee) {
        assignees.push(role.assignee);
      }
    });
  }

  return assignees;
};

export const getAssignedRoles = (project: ProjectDTO): ProjectRoleDTO[] => {
  var assignedRoles: ProjectRoleDTO[] = [];

  if (project.projectRoles) {
    project.projectRoles.forEach((role) => {
      if (role.assignee) {
        assignedRoles.push(role);
      }
    });
  }

  return assignedRoles;

}