import { FC } from "react";
import { useSetProjectState } from "../../RecoilStates/profileState";
import { usePostApiProject } from "@/common/api/endpoints/cocreateApi";
import { ProjectCreateDTO } from "@/common/api/model";
import { EntityType } from "../../Account/Common/Media/EntityType";
import { generateAndStoreSymmetricAesKey } from "@/common/encryption/encryptionHelper";
import { usePrepareAndUpload } from "@/common/media/mediaHooks";
import ChatType from "@/common/chat/chatType";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import { getChatId } from "@/common/chat/chatHelper";
import { postApiProjectBody } from "@/src/gen/zod/coCreateAPI";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MultiStepForm } from "@/common/forms/MultiStepForm";
import ProjectCreateTitleAndDescription from "./ProjectCreateTitleAndDescription";
import ProjectCreateMedias from "./ProjectCreateMedias";

const defaultFormValues: ProjectCreateDTO = {
  description: "",
  medias: [],
  name: "",
};

const ProjectCreate: FC = () => {
  const { t } = useTranslation();
  const setProject = useSetProjectState();

  const formZodSchema = postApiProjectBody.extend({
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
        (medias) => medias.filter((media) => media !== undefined).length === 2,
        {
          message: t("projects.create-project.error.media-required"),
          path: ["root"],
        }
      ),
    description: z
      .string()
      .optional()
      .refine((val) => val !== "", {
        message: t("projects.create-project.error.description-required"),
      }),
    name: z
      .string()
      .optional()
      .refine((val) => val !== "", {
        message: t("projects.create-project.error.media-required"),
      }),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectCreateDTO>({
    resolver: zodResolver(formZodSchema),
    mode: "onSubmit",
    defaultValues: defaultFormValues,
  });

  const { uploadMediaCreateDTOs } = usePrepareAndUpload(EntityType.PROJECT);

  const { mutate: createProject } = usePostApiProject({
    mutation: {
      onSuccess: async (data) => {
        setProject((state) => {
          const newState = [...state];
          newState.push(data);
          return newState;
        });

        await generateAndStoreSymmetricAesKey(
          getChatId(ChatType.Project, data.id)
        );

        router.navigate({
          pathname: "/main/editProject",
          params: {
            projectId: data.id,
          },
        });
      },
    },
  });

  const handleCreate = async () => {
    handleSubmit(async (data) => {
      const uploadedMedias = await uploadMediaCreateDTOs(data.medias);
      createProject({ data: { ...data, medias: uploadedMedias } });
    })();
  };

  return (
    <MultiStepForm
      onSubmit={() => {
        handleCreate();
      }}
      onCancel={() => {
        router.back();
      }}
    >
      <ProjectCreateTitleAndDescription
        control={control}
        title={t("projects.create-project.title")}
        hasError={!!errors?.description || !!errors?.name}
      />
      <ProjectCreateMedias
        control={control}
        title={t("projects.create-project.add-pictures-title")}
        hasError={!!errors?.medias?.root?.message}
      />
    </MultiStepForm>
  );
};

export default ProjectCreate;
