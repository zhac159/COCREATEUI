import { ExperienceDTO } from "@/common/api/model";
import { ExperienceType } from "@/components/Experience/ExperienceType";
import { useMemo } from "react";

export const useGetRolesCommissionedAndWorked = (
  experiences: ExperienceDTO[]
) => {
  const completedProjects = useMemo(
    () =>
      experiences.filter((e) => e.experienceType === ExperienceType.Project),
    [experiences]
  );

  const completedProjectRoles = useMemo(
    () =>
      experiences.filter(
        (e) => e.experienceType === ExperienceType.ProjectRole
      ),
    [experiences]
  );

  return {
    completedProjects,
    completedProjectRoles,
  };
};
