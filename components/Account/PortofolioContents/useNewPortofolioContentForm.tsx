import {
  useSetPortfolioContentsState,
  useSkillsValue,
} from "@/components/RecoilStates/profileState";
import { useState } from "react";
import { View, TextInput, Text } from "react-native";
import SkillsList from "../Skills/SkillsList";
import Media from "@/components/MediaViewer/Media";
import { StyleSheet } from "react-native";
import { getMediaTypeFromUri, useGetMedia } from "../Common/Media/mediaHelper";
import { useTheme } from "@/components/Themes/theme";
import {
  MediaCreateDTO,
  PortofolioContentCreateDTO,
  PortofolioContentDTO,
  SkillType,
} from "@/common/api/model";
import { usePostApiPortofolioContent } from "@/common/api/endpoints/cocreateApi";
import { EntityType } from "../Common/Media/EntityType";
import { useCacheImages } from "@/components/MediaViewer/mediaViewerHelper";
import { usePrepareAndUpload } from "@/common/media/mediaHooks";

const useNewPortofolioContentForm = () => {
  const setPortofolioContents = useSetPortfolioContentsState();

  const [isLoading, setIsLoading] = useState(false);

  const userSkills = useSkillsValue();

  const cacheImages = useCacheImages();
  const cachePortofolioContent = async (
    portofolioContent: PortofolioContentDTO
  ) => {
    var uris = portofolioContent.medias?.map((media) => media.uri);
    await cacheImages(uris || []);
  };

  const [description, setDescription] = useState<string>("");
  const [skill, setSkill] = useState<SkillType | undefined>(
    userSkills[0]?.skillType
  );
  const [uris, setUris] = useState<string[]>([]);
  const getMedia = useGetMedia(setUris);

  const {upload, isLoading: isUploadingImages} = usePrepareAndUpload(EntityType.PORTOFOLIOCONTENT);

  const { mutate: createPortofolioContent } = usePostApiPortofolioContent({
    mutation: {
      onSuccess: (data) => {
        setPortofolioContents((state) => {
          const newState = [...(state || [])];
          newState.push(data);
          return newState;
        });
        cachePortofolioContent(data);
        setIsLoading(false);
        setUris([]);
        setDescription("");
      },
    },
  });

  const handleCreate = async () => {
    setIsLoading(true);
    const uploadedUrls = await upload(uris);
    const newMedias: MediaCreateDTO[] = uploadedUrls.map((url) => {
      return {
        uri: url,
        mediaType: getMediaTypeFromUri(url),
      };
    });

    const NewPortofolioContent: PortofolioContentCreateDTO = {
      medias: newMedias,
      description: description,
      skillType: skill,
      order: 10,
    };

    createPortofolioContent({ data: NewPortofolioContent });
  };

  const theme = useTheme();

  const FormNode = (
    <View
      style={{
        gap: 50,
      }}
    >
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
              uri={uris[2]}
              style={NewPortofolioContentFormStyles.smallImage}
              editMode={true}
            />
          </View>
        </View>
      </View>
      <TextInput
        placeholder="Description..."
        style={{
          ...theme.customFonts.primary.small,
          backgroundColor: theme.colors.lightGray,
          padding: 10,
          borderRadius: 7,
          height: 100,
          textAlignVertical: "top",
        }}
        multiline={true}
        value={description}
        onChangeText={setDescription}
      />
    </View>
  );

  return { FormNode, handleCreate, isLoading };
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
