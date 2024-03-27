import {
  useSetPortfolioContentsState,
  useSkillsValue,
} from "@/components/RecoilStates/profileState";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { View, TextInput } from "react-native";
import SkillsList from "../Skills/SkillsList";
import Media from "@/components/MediaViewer/Media";
import { StyleSheet } from "react-native";
import {
  getCleanUrl,
  getMediaTypeFromUri,
  uploadFiles,
  useGetMedia,
} from "../Common/Media/mediaHelper";
import { useTheme } from "@/components/Themes/theme";
import {
  MediaCreateDTO,
  PortofolioContentCreateDTO,
  PortofolioContentDTO,
  PrepareUploadDTO,
  SkillType,
} from "@/common/api/model";
import {
  usePostApiPortofolioContent,
  usePostApiPrepare,
} from "@/common/api/endpoints/cocreateApi";
import { EntityType } from "../Common/Media/EntityType";
import { useCacheImages } from "@/components/MediaViewer/mediaViewerHelper";

type NewPortofolioContentFormProps = {
  setCreate: Dispatch<SetStateAction<() => void>>;
  setCreateMode: Dispatch<SetStateAction<boolean>>;
};

const NewPortofolioContentForm: FC<NewPortofolioContentFormProps> = ({
  setCreate,
  setCreateMode,
}) => {
  const setPortofolioContents = useSetPortfolioContentsState();

  const userSkills = useSkillsValue();

  const cacheImages = useCacheImages();
  const cachePortofolioContent = async (
    portofolioContent: PortofolioContentDTO
  ) => {
    var uris = portofolioContent.medias?.map((media) => media.uri || "") || [];
    await cacheImages(uris || []);
  };

  const [description, setDescription] = useState<string>("");
  const [skill, setSkill] = useState<SkillType>();
  const [uris, setUris] = useState<string[]>([]);
  const getMedia = useGetMedia(setUris);

  const { mutate: createPortofolioContent } = usePostApiPortofolioContent({
    mutation: {
      onSuccess: (data) => {
        setPortofolioContents((state) => {
          const newState = [...(state || [])];
          newState.push(data);
          return newState;
        });
        cachePortofolioContent(data);
        setCreateMode(false);
      },
    },
  });

  const { mutate: prepareDownlaod } = usePostApiPrepare({
    mutation: {
      onSuccess: (data) => {
        const sasURIs = data.sasURIs;

        if (sasURIs) {
          uploadFiles(data.sasURIs || [], uris);
          let newMedias: MediaCreateDTO[] = [];
          newMedias =
            uris.map((_, index) => {
              const cleanUrl = getCleanUrl(sasURIs[index] || "");
              const newMedia: MediaCreateDTO = {
                uri: cleanUrl,
                mediaType: getMediaTypeFromUri(cleanUrl),
              };
              return newMedia;
            }) || [];

          const NewPortofolioContent: PortofolioContentCreateDTO = {
            medias: newMedias,
            description: description,
            skillType: skill,
            order: 10,
          };
          createPortofolioContent({ data: NewPortofolioContent });
        }
      },
    },
  });

  const handleCreate = () => {
    const prepareUploadSubmission: PrepareUploadDTO[] =
      uris.map((uri: string) => {
        const prepareUpload: PrepareUploadDTO = {
          entity: EntityType.PORTOFOLIOCONTENT,
          mediaType: getMediaTypeFromUri(uri),
        };
        return prepareUpload;
      }) || [];
    prepareDownlaod({ data: prepareUploadSubmission });
  };

  useEffect(() => {
    setCreate(() => handleCreate);
  }, [uris, description, skill]);

  const theme = useTheme();

  if (!userSkills) return null;

  return (
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
        selectedSkillType={skill}
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
        }}
        multiline={true}
        value={description}
        onChangeText={setDescription}
      />
    </View>
  );
};

export default NewPortofolioContentForm;

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
});
