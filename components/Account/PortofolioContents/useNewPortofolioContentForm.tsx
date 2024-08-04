import {
  useSetPortfolioContentsState,
  useSkillsValue,
} from "@/components/RecoilStates/profileState";
import { useMemo, useState } from "react";
import { View, Text } from "react-native";
import SkillsList from "../Skills/SkillsList";
import Media from "@/components/MediaViewer/Media";
import { StyleSheet } from "react-native";
import {
  getMediaCreateDTOsFromUris,
  useGetMedia,
} from "../Common/Media/mediaHelper";
import { useTheme } from "@/components/Themes/theme";
import { PortofolioContentCreateDTO, SkillType } from "@/common/api/model";
import { usePostApiPortofolioContent } from "@/common/api/endpoints/cocreateApi";
import { EntityType } from "../Common/Media/EntityType";
import { usePrepareAndUpload } from "@/common/media/mediaHooks";
import { useTranslation } from "react-i18next";
import StyledTextField from "@/components/Common/StyledTextField";

const useNewPortofolioContentForm = (onComplete?: () => void) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const setPortofolioContents = useSetPortfolioContentsState();

  const [isLoading, setIsLoading] = useState(false);

  const userSkills = useSkillsValue();

  const [description, setDescription] = useState<string>("");

  const [skill, setSkill] = useState<SkillType | undefined>(
    userSkills[0] ? userSkills[0].skillType : undefined
  );

  const [uris, setUris] = useState<string[]>([]);
  const getMedia = useGetMedia(setUris);

  const reset = () => {
    setUris([]);
    setDescription("");
  };

  const {
    upload,
    isLoading: isUploadingImages,
    filesUploadingStatus,
  } = usePrepareAndUpload(EntityType.PORTOFOLIOCONTENT, () => {
    setUris([]);
    setDescription("");
    onComplete?.();
  });

  const { mutate: createPortofolioContent, isLoading: isLoadingCreating } =
    usePostApiPortofolioContent({
      mutation: {
        onSuccess: (data) => {
          setPortofolioContents((state) => {
            const newState = [data, ...state];
            return newState;
          });
          setIsLoading(false);

        },
      },
    });

  const handleCreate = async () => {
    setIsLoading(true);
    const uploadedUrls = await upload(uris);
    const NewPortofolioContent: PortofolioContentCreateDTO = {
      medias: getMediaCreateDTOsFromUris(uploadedUrls),
      description: description,
      skillType: skill,
      order: 10,
    };
    createPortofolioContent({ data: NewPortofolioContent });
  };

  const FormNode = useMemo(
    () => (
      <View
        style={{
          gap: 50,
        }}
      >
        <Text
          style={{
            ...theme.customFonts.primary.medium,
            fontWeight: "400",
            fontSize: 15,
          }}
        >
          {t("account.portfolio.add-description")}
        </Text>
        <SkillsList
          skills={userSkills}
          editMode={false}
          selectSkill={(skill) => setSkill(skill.skillType)}
          deselectSkill={() => null}
          selectedSkill={skill}
        />
        <View
          style={{
            flex: 1,
            height: 407,
            padding: 10,
            borderRadius: 7,
            backgroundColor: theme.colors.lightGray,
          }}
        >
          <View
            style={{
              flex: 1,
              borderRadius: 7,
            }}
          >
            <Media
              onPress={() => getMedia(0)}
              loadingState={filesUploadingStatus?.get(uris[0])}
              uri={uris[0]}
              style={NewPortofolioContentFormStyles.mainImage}
              editMode={true}
            />
          </View>
          <View style={NewPortofolioContentFormStyles.smallImagesContainer}>
            <View
              style={{
                flex: 1,
                borderRadius: 7,
              }}
            >
              <Media
                onPress={() => getMedia(1)}
                loadingState={filesUploadingStatus?.get(uris[1])}
                uri={uris[1]}
                style={NewPortofolioContentFormStyles.smallImage}
                editMode={true}
              />
            </View>
            <View
              style={{
                flex: 1,
                borderRadius: 7,
              }}
            >
              <Media
                onPress={() => getMedia(2)}
                loadingState={filesUploadingStatus?.get(uris[2])}
                uri={uris[2]}
                style={NewPortofolioContentFormStyles.smallImage}
                editMode={true}
              />
            </View>
          </View>
        </View>
        <StyledTextField
          editable={true}
          onChangeText={setDescription}
          textInputProps={{
            placeholder: t("account.portfolio.add-description-placeholder"),
            multiline: true,
            numberOfLines: 5,
          }}
        />
      </View>
    ),
    [
      uris,
      description,
      skill,
      userSkills,
      theme,
      getMedia,
      upload,
      filesUploadingStatus,
    ]
  );

  return {
    FormNode,
    handleCreate,
    isLoading: isLoading || isUploadingImages || isLoadingCreating,
    reset
  };
};

export default useNewPortofolioContentForm;

const NewPortofolioContentFormStyles = StyleSheet.create({
  mainImage: {
    height: 197,
    borderRadius: 7,
    flex: 1,
  },
  smallImagesContainer: {
    flexDirection: "row",
    backgroundColor: "transparent",
    height: 187,
    marginTop: 4,
    gap: 7,
  },
  smallImage: {
    width: "100%",
    height: 187,
    borderRadius: 7,
  },
  doneButton: {
    alignSelf: "flex-end",
    marginTop: "2%",
    marginRight: "2%",
    marginBottom: "5%",
    borderRadius: 100,
  },
});
