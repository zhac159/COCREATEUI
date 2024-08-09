import { MediaUpdateDTO, ProjectRoleDTO } from "@/common/api/model";
import { MultiStepForm } from "@/common/forms/MultiStepForm";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import ProjectRoleFormSkill from "./ProjectRoleFormSkill";
import ProjectRoleKeywords from "./ProjectRoleFormKeywords";
import ProjectRoleTitleAndDescription from "./ProjectRoleFormTitleAndDescription";
import ProjectRoleFormMedia from "./ProjectRoleFormMedia";
import { z } from "zod";
import { postApiProjectRoleBody } from "@/src/gen/zod/coCreateAPI";
import { zodResolver } from "@hookform/resolvers/zod";
import ProjectRoleCost from "./ProjectRoleFormCost";
import {
  useCoinsValue,
  useProjectState,
} from "@/components/RecoilStates/profileState";
import ProjectRoleLocationDate from "./ProjectRoleFormLocationDate";
import { router } from "expo-router";
import {
  usePostApiProjectRole,
  usePutApiProjectRole,
} from "@/common/api/endpoints/cocreateApi";
import { usePrepareAndUpload } from "@/common/media/mediaHooks";
import { EntityType } from "@/components/Account/Common/Media/EntityType";

type ProjectRoleFormProps = {
  projectRole?: ProjectRoleDTO;
  projectId: number;
};

const ProjectRoleForm: FC<ProjectRoleFormProps> = ({
  projectRole,
  projectId,
}) => {
  const availableCoins = useCoinsValue();
  const [hours, setHours] = useState(true);
  const { t } = useTranslation();
  const [_, setProject] = useProjectState();

  const { mutate: createProjectRole } = usePostApiProjectRole({
    mutation: {
      onSuccess: (data) => {
        setProject((state) => {
          const currentState = state || [];
          const projectIndex = currentState.findIndex(
            (project) => project.id === projectId
          );
          if (projectIndex === -1) {
            return currentState;
          }
          const newState = [...currentState];
          const project = { ...newState[projectIndex] };
          if (project.projectRoles) {
            project.projectRoles = [...project.projectRoles, data];
          } else {
            project.projectRoles = [data];
          }
          newState[projectIndex] = project;
          return newState;
        });
        router.back();
      },
    },
  });

  const { mutate: updateProjectRole } = usePutApiProjectRole({
    mutation: {
      onSuccess: (data) => {
        setProject((state) => {
          const currentState = state || [];

          const newState = [...currentState];

          const project = { ...newState[0] };

          if (project.projectRoles) {
            const index = project.projectRoles.findIndex(
              (role) => role.id === data.id
            );
            if (index !== -1) {
              const newProjectRoles = [...project.projectRoles];
              newProjectRoles[index] = data;
              const newProject = { ...project, projectRoles: newProjectRoles };
              newState[0] = newProject;
            }
          } else {
            const newProject = { ...project, projectRoles: [data] };
            newState[0] = newProject;
          }

          return newState;
        });
        router.back();
      },
    },
  });

  const { uploadMediaCreateDTOs } = usePrepareAndUpload(EntityType.PROJECTROLE);

  const formZodSchema = postApiProjectRoleBody.extend({
    medias: z
      .array(
        z
          .object({
            uri: z.string(),
            mediaType: z.number(),
          })
          .optional()
      )
      .refine(
        (medias) => medias.filter((media) => media !== undefined).length === 1,
        {
          message: t("projects.add-role.error.media-required"),
        }
      ),
    effort: z
      .number()
      .optional()
      .refine((val) => val !== undefined, {
        message: t("projects.add-role.error.effort-required"),
      }),
    description: z
      .string()
      .optional()
      .refine((val) => !!val, {
        message: t("projects.add-role.error.description-required"),
      }),
    address: z
      .string()
      .optional()
      .refine((val) => !!val, {
        message: t("projects.add-role.error.address-required"),
      }),
    skillType: z
      .number()
      .optional()
      .refine((val) => val !== undefined, {
        message: t("projects.add-role.error.skill-required"),
      }),
    name: z
      .string()
      .optional()
      .refine((val) => !!val, {
        message: t("projects.add-role.error.title-required"),
      }),
    cost: z
      .number()
      .optional()
      .refine((val) => val !== undefined, {
        message: t("projects.add-role.error.cost-required"),
      })
      .refine((val) => val <= availableCoins, {
        message: t("projects.add-role.error.insufficient-credits"),
      }),
  });

  const {
    control,
    handleSubmit: submitForm,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<ProjectRoleDTO>({
    defaultValues: projectRole || {
      keywords: [],
      medias: [],
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      remote: false,
    },
    resolver: zodResolver(formZodSchema),
  });

  const handleSubmit = () => {
    console.log(getValues());
    submitForm(async (data) => {
      const uploadedMedias = await uploadMediaCreateDTOs(data.medias);

      if (projectRole) {
        const updateMedia: MediaUpdateDTO = {
          id: projectRole.medias[0].id,
          uri: uploadedMedias[0].uri,
          mediaType: uploadedMedias[0].mediaType,
        };

        return updateProjectRole({
          data: {
            ...data,
            effort: data.effort * (hours ? 1 : 24),
            medias: [updateMedia],
            id: projectRole.id,
          },
        });
      } else {
        createProjectRole({
          data: {
            ...data,
            effort: data.effort * (hours ? 1 : 24),
            medias: uploadedMedias,
            projectId,
          },
        });
      }
    })();
  };

  return (
    <MultiStepForm onSubmit={handleSubmit} onCancel={() => router.back()}>
      <ProjectRoleFormSkill
        control={control}
        title={t("projects.add-role.skills-title")}
        hasError={!!errors.skillType}
      />
      <ProjectRoleTitleAndDescription
        control={control}
        title={t("projects.add-role.title-description-form-header")}
        hasError={!!errors.name || !!errors.description}
      />
      <ProjectRoleKeywords
        control={control}
        title={t("projects.add-role.keywords-title")}
        hasError={!!errors.keywords}
      />
      <ProjectRoleLocationDate
        control={control}
        title={t("projects.add-role.location-date-title")}
        setValue={setValue}
        watch={watch}
        hours={hours}
        setHours={setHours}
        hasError={!!errors.address || !!errors.startDate || !!errors.effort}
      />
      <ProjectRoleCost
        control={control}
        title={t("projects.add-role.cost-title")}
        hasError={!!errors.cost}
      />
      <ProjectRoleFormMedia
        control={control}
        title={t("projects.add-role.media-title")}
        hasError={!!errors.medias}
      />
    </MultiStepForm>
  );
};

export default ProjectRoleForm;
