import { FC, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../Themes/theme";
import {
  getCleanUrl,
  getMediaTypeFromUri,
  uploadFiles,
  useGetMedia,
} from "../Account/Common/Media/mediaHelper";
import Media from "../MediaViewer/Media";
import NextButton from "./NextButton";
import { useSetProjectState } from "../RecoilStates/profileState";
import {
  usePostApiPrepare,
  usePostApiProject,
} from "@/common/api/endpoints/cocreateApi";
import {
  MediaCreateDTO,
  PrepareUploadDTO,
  ProjectCreateDTO,
} from "@/common/api/model";
import { EntityType } from "../Account/Common/Media/EntityType";
import CancelButton from "./CancelButton";

type ProjectCreateProps = {
  onCancel: () => void;
};

const ProjectCreate: FC<ProjectCreateProps> = ({ onCancel }) => {
  const setProject = useSetProjectState();

  const [uris, setUris] = useState<string[]>([]);
  const getMedia = useGetMedia(setUris, true);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [showImages, setShowImages] = useState<boolean>(false);

  const { mutate: createProject } = usePostApiProject({
    mutation: {
      onSuccess: (data) => {
        setProject((state) => {
          const newState = [...(state || [])];
          newState.push(data);
          return newState;
        });
        onCancel();
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

          const NewProject: ProjectCreateDTO = {
            medias: newMedias,
            description: description,
            name: title,
          };
          createProject({ data: NewProject });
        }
      },
    },
  });

  const handleCreate = () => {
    const prepareUploadSubmission: PrepareUploadDTO[] =
      uris.map((uri: string) => {
        const prepareUpload: PrepareUploadDTO = {
          entity: EntityType.PROJECT,
          mediaType: getMediaTypeFromUri(uri),
        };
        return prepareUpload;
      }) || [];
    prepareDownlaod({ data: prepareUploadSubmission });
  };

  const theme = useTheme();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView
        style={{
          backgroundColor: "white",
          height: "100%",
        }}
      >
        <View
          style={{
            height: "100%",
            paddingHorizontal: "5%",
            gap: 25,
          }}
        >
          <CancelButton
            onPress={onCancel}
          />
          {!showImages && (
            <>
              <Text
                style={{
                  ...theme.customFonts.secondary.large,
                  fontWeight: "400",
                  fontSize: 35,
                }}
              >
                What is Your Project About
              </Text>
              <TextInput
                style={{
                  ...theme.customFonts.primary.medium,
                  ...styles.titleTextInput,
                  color: theme.colors.black,
                  backgroundColor: theme.colors.lightestGray,
                }}
                numberOfLines={14}
                multiline={true}
                value={title}
                onChangeText={(text) => {
                  if (text.length <= 30) {
                    setTitle(text);
                  }
                }}
                placeholder="Project Title..."
              />
              <Text
                style={{
                  ...theme.customFonts.primary.medium,
                  fontWeight: "500",
                  fontSize: 14,
                }}
              >
                What is Your Project About
              </Text>
              <TextInput
                style={{
                  ...theme.customFonts.primary.medium,
                  ...styles.desciptionTextInput,
                  color: theme.colors.black,
                  backgroundColor: theme.colors.lightestGray,
                }}
                numberOfLines={14}
                multiline={true}
                value={description}
                onChangeText={(text) => {
                  if (text.length <= 30) {
                    setDescription(text);
                  }
                }}
                placeholder="Project Description..."
              />
              <Text
                style={{
                  ...theme.customFonts.primary.medium,
                  fontWeight: "500",
                  fontSize: 14,
                }}
              >
                What is Your Project About
              </Text>
            </>
          )}
          {showImages && (
            <>
              <Text
                style={{
                  ...theme.customFonts.secondary.large,
                  fontWeight: "400",
                  fontSize: 35,
                }}
              >
                Add Project Pictures
              </Text>
              <View
                style={{
                  borderRadius: 7,
                  height: "30%",
                  backgroundColor: theme.colors.lightGray,
                }}
              >
                <Media
                  onPress={() => getMedia(0)}
                  uri={uris[0]}
                  style={styles.mainImage}
                  editMode={true}
                />
              </View>
              <View
                style={{
                  borderRadius: 7,
                  height: "30%",
                  backgroundColor: theme.colors.lightGray,
                }}
              >
                <Media
                  onPress={() => getMedia(1)}
                  uri={uris[1]}
                  style={styles.mainImage}
                  editMode={true}
                />
              </View>
            </>
          )}
          <NextButton
            text="Next"
            icon="arrow-right"
            onPress={() => {
              showImages ? handleCreate() : setShowImages(true);
            }}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ProjectCreate;

const styles = StyleSheet.create({
  titleTextInput: {
    fontSize: 25,
    height: "12%",
    padding: 10,
    borderRadius: 7,
  },
  desciptionTextInput: {
    fontSize: 16,
    height: "25%",
    padding: 10,
    borderRadius: 7,
  },
  mainImage: {
    borderRadius: 7,
    flex: 1,
  },
});
