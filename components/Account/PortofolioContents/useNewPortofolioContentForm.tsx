import {
  useSetPortfolioContentsState,
  useSkillsValue,
} from "@/components/RecoilStates/profileState";
import { useMemo, useState } from "react";
import { View } from "react-native";
import SkillsList from "../Skills/SkillsList";
import Media from "@/components/MediaViewer/Media";
import { StyleSheet } from "react-native";
import {
  useGetMediaCreateDTO,
} from "../Common/Media/mediaHelper";
import { PortofolioContentCreateDTO } from "@/common/api/model";
import { usePostApiPortofolioContent } from "@/common/api/endpoints/cocreateApi";
import { EntityType } from "../Common/Media/EntityType";
import { usePrepareAndUpload } from "@/common/media/mediaHooks";
import { useTranslation } from "react-i18next";
import StyledTextField from "@/components/Common/StyledTextField";
import StyledText from "@/components/Common/StyledComponents/StyledText";
import CustomTheme from "@/components/Themes/themeType";
import useThemedStyles from "@/components/Common/StyledComponents/hooks/useThemedStyles";
import { Controller, useForm } from "react-hook-form";
import { postApiPortofolioContentBody } from "@/src/gen/zod/coCreateAPI";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormFieldWrapper from "@/common/forms/FormFieldWrapper";

const useNewPortofolioContentForm = (onComplete?: () => void) => {
  const { t } = useTranslation();
  const styles = useThemedStyles(getStyles);
  const userSkills = useSkillsValue();

  const formZodSchema = postApiPortofolioContentBody.extend({
    skillType: z
      .number()
      .optional()
      .refine((val) => val !== undefined, {
        message: t("account.portfolio.errors.skill-required"),
      }),
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
        (medias) => medias.filter((media) => media !== undefined).length > 0,
        {
          message: t("account.portfolio.errors.media-required"),
          path: ["root"],
        }
      ),
    description: z
      .string()
      .optional()
      .refine((val) => val !== "", {
        message: t("account.portfolio.errors.description-required"),
      }),
  });

  const setPortofolioContents = useSetPortfolioContentsState();

  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
  } = useForm<PortofolioContentCreateDTO>({
    defaultValues: {
      description: "",
      skillType: undefined,
      medias: [],
      order: 10,
    },
    mode: "onSubmit",
    resolver: zodResolver(formZodSchema),
  });

  const getMedia = useGetMediaCreateDTO();

  const { uploadMediaCreateDTOs, filesUploadingStatus } = usePrepareAndUpload(
    EntityType.PORTOFOLIOCONTENT,
    () => {
      reset();
      onComplete?.();
      setIsLoading(false);
    }
  );

  const { mutate: createPortofolioContent } = usePostApiPortofolioContent({
    mutation: {
      onSuccess: (data) => {
        setPortofolioContents((state) => {
          const newState = [data, ...state];
          return newState;
        });
      },
    },
  });

  const handleCreate = async () => {
    handleSubmit(async (data) => {
      setIsLoading(true);
      const uploadedMedias = await uploadMediaCreateDTOs(data.medias);
      createPortofolioContent({ data: { ...data, medias: uploadedMedias } });
    })();
  };

  const FormNode = useMemo(
    () => (
      <View style={styles.container}>
        <StyledText content={t("account.portfolio.add-description")} />
        <Controller
          control={control}
          name="skillType"
          render={({ fieldState: { error }, field: { onChange, value } }) => (
            <FormFieldWrapper error={error?.message}>
              <SkillsList
                skills={userSkills}
                selectSkill={(skill) => onChange(skill.skillType)}
                selectedSkill={value}
              />
            </FormFieldWrapper>
          )}
        />
        <Controller
          control={control}
          name="medias"
          render={({ fieldState: { error } }) => (
            <FormFieldWrapper error={error?.root?.message} />
          )}
        />
        <View style={styles.imageInputContainer}>
          <Controller
            control={control}
            name="medias.0"
            render={({ field: { onChange, value } }) => (
              <Media
                onPress={async () => {
                  const mediaCreate = await getMedia();
                  if (mediaCreate) {
                    onChange(mediaCreate);
                  }
                }}
                loadingState={filesUploadingStatus?.get(value?.uri)}
                uri={value?.uri}
                style={styles.mainImage}
                editMode={true}
              />
            )}
          />
          <View style={styles.smallImagesContainer}>
            <Controller
              control={control}
              name="medias.1"
              render={({ field: { onChange, value } }) => (
                <Media
                  onPress={async () => {
                    const mediaCreate = await getMedia();
                    if (mediaCreate) {
                      onChange(mediaCreate);
                    }
                  }}
                  loadingState={filesUploadingStatus?.get(value?.uri)}
                  uri={value?.uri}
                  style={styles.smallImage}
                  editMode={true}
                />
              )}
            />
            <Controller
              control={control}
              name="medias.2"
              render={({ field: { onChange, value } }) => (
                <Media
                  onPress={async () => {
                    const mediaCreate = await getMedia();
                    if (mediaCreate) {
                      onChange(mediaCreate);
                    }
                  }}
                  loadingState={filesUploadingStatus?.get(value?.uri)}
                  uri={value?.uri}
                  style={styles.smallImage}
                  editMode={true}
                />
              )}
            />
          </View>
        </View>
        <Controller
          control={control}
          name="description"
          render={({ fieldState: { error }, field: { onChange, value } }) => (
            <FormFieldWrapper error={error?.message}>
              <StyledTextField
                editable={true}
                value={value}
                onChangeText={onChange}
                textInputProps={{
                  placeholder: t(
                    "account.portfolio.add-description-placeholder"
                  ),
                  multiline: true,
                  numberOfLines: 5,
                }}
              />
            </FormFieldWrapper>
          )}
        />
      </View>
    ),
    [userSkills, getMedia, filesUploadingStatus]
  );

  return {
    FormNode,
    handleCreate,
    isLoading: isLoading,
    reset,
  };
};

export default useNewPortofolioContentForm;

const getStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    container: {
      gap: 50,
    },
    imageInputContainer: {
      flex: 1,
      height: 407,
      padding: 10,
      borderRadius: 7,
      backgroundColor: theme.colors.lightGray,
    },
    mainImage: {
      height: 197,
      borderRadius: 7,
      flex: 1,
    },
    smallImagesContainer: {
      flexDirection: "row",
      width: "100%",
      backgroundColor: "transparent",
      height: 187,
      marginTop: 4,
      gap: 7,
    },
    smallImage: {
      width: "49%",
      height: 187,
      borderRadius: 7,
      backgroundColor: "transparent",
    },
  });
