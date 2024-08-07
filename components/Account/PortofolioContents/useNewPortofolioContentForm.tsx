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
  getMediaCreateDTOsFromUris,
  useGetMedia,
  useGetMediaCreateDTO,
} from "../Common/Media/mediaHelper";
import { PortofolioContentCreateDTO, SkillType } from "@/common/api/model";
import { usePostApiPortofolioContent } from "@/common/api/endpoints/cocreateApi";
import { EntityType } from "../Common/Media/EntityType";
import { usePrepareAndUpload } from "@/common/media/mediaHooks";
import { useTranslation } from "react-i18next";
import StyledTextField from "@/components/Common/StyledTextField";
import StyledText from "@/components/Common/StyledComponents/StyledText";
import CustomTheme from "@/components/Themes/themeType";
import useThemedStyles from "@/components/Common/StyledComponents/hooks/useThemedStyles";
import { Controller, useForm } from "react-hook-form";

const useNewPortofolioContentForm = (onComplete?: () => void) => {
  const { t } = useTranslation();
  const styles = useThemedStyles(getStyles);
  const userSkills = useSkillsValue();

  const setPortofolioContents = useSetPortfolioContentsState();

  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, reset } = useForm<PortofolioContentCreateDTO>({
    defaultValues: {
      description: "",
      skillType: userSkills[0]?.skillType,
      medias: [],
      order: 10,
    },
  });

  const getMedia = useGetMediaCreateDTO();

  const { upload, filesUploadingStatus } = usePrepareAndUpload(
    EntityType.PORTOFOLIOCONTENT,
    (uri) => {
      console.log("URI", uri);
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
    setIsLoading(true);
    handleSubmit(async (data) => {
      const uris = data.medias
        .filter((media) => !!media)
        .map((media) => media.uri);

      console.log("data", uris);

      const uploadedUrls = await upload(uris);

      console.log("uploadedUrls", uploadedUrls);
      data.medias = getMediaCreateDTOsFromUris(uploadedUrls);
      createPortofolioContent({ data });
    })();
  };

  const FormNode = useMemo(
    () => (
      <View style={styles.container}>
        <StyledText content={t("account.portfolio.add-description")} />
        <Controller
          control={control}
          name="skillType"
          render={({ field: { onChange, value } }) => (
            <SkillsList
              skills={userSkills}
              selectSkill={(skill) => onChange(skill.skillType)}
              selectedSkill={value}
            />
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
          render={({ field: { onChange, value } }) => (
            <StyledTextField
              editable={true}
              value={value}
              onChangeText={onChange}
              textInputProps={{
                placeholder: t("account.portfolio.add-description-placeholder"),
                multiline: true,
                numberOfLines: 5,
              }}
            />
          )}
        />
      </View>
    ),
    [userSkills, getMedia, upload, filesUploadingStatus]
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
