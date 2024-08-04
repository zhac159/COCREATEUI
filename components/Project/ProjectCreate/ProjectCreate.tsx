import { FC, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useTheme } from "../../Themes/theme";
import {
  getMediaCreateDTOs,
  useGetMedia,
} from "../../Account/Common/Media/mediaHelper";
import Media from "../../MediaViewer/Media";
import { useSetProjectState } from "../../RecoilStates/profileState";
import { usePostApiProject } from "@/common/api/endpoints/cocreateApi";
import { ProjectCreateDTO } from "@/common/api/model";
import { EntityType } from "../../Account/Common/Media/EntityType";
import CancelButton from "../Common/CancelButton";
import { generateAndStoreSymmetricAesKey } from "@/common/encryption/encryptionHelper";
import { usePrepareAndUpload } from "@/common/media/mediaHooks";
import ChatType from "@/common/chat/chatType";
import { useTranslation } from "react-i18next";
import StyledTextField from "@/components/Common/StyledTextField";
import StyledButton from "@/components/Common/StyledButton";
import { router } from "expo-router";
import { getChatId } from "@/common/chat/chatHelper";

type ProjectCreateProps = {};

const ProjectCreate: FC<ProjectCreateProps> = () => {
  const { t } = useTranslation();

  const setProject = useSetProjectState();
  const { upload, isLoading: isUploadingImages } = usePrepareAndUpload(
    EntityType.PROJECT
  );

  const [uris, setUris] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const getMedia = useGetMedia(setUris, true);

  const [showImages, setShowImages] = useState<boolean>(false);

  const { mutate: createProject, isLoading } = usePostApiProject({
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
    const urls = await upload(uris);
    const newMedias = getMediaCreateDTOs(urls);
    const NewProject: ProjectCreateDTO = {
      medias: newMedias,
      description: description,
      name: title,
    };
    createProject({ data: NewProject });
  };

  const theme = useTheme();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <CancelButton onPress={() => router.back()} />
        {!showImages && (
          <View
            style={{
              gap: 20,
            }}
          >
            <Text
              style={{
                ...theme.customFonts.secondary.large,
                fontWeight: "400",
                fontSize: 35,
              }}
            >
              {t("projects.create-project.title")}
            </Text>
            <StyledTextField
              textInputProps={{
                style: {
                  ...theme.customFonts.primary.medium,
                  ...styles.titleTextInput,
                  color: theme.colors.black,
                  backgroundColor: theme.colors.lightGray,
                },
                numberOfLines: 14,
                multiline: true,
                value: title,
                onChangeText: (text) => {
                  if (text.length <= 30) {
                    setTitle(text);
                  }
                },
                placeholder: t("projects.create-project.title-placeholder"),
              }}
              editable={true}
              tooltip={t("projects.create-project.title-tooltip")}
            />
            <StyledTextField
              textInputProps={{
                style: {
                  ...theme.customFonts.primary.medium,
                  ...styles.desciptionTextInput,
                  color: theme.colors.black,
                  backgroundColor: theme.colors.lightGray,
                },
                numberOfLines: 14,
                multiline: true,
                value: description,
                onChangeText: (text) => {
                  if (text.length <= 30) {
                    setDescription(text);
                  }
                },
                placeholder: t(
                  "projects.create-project.description-placeholder"
                ),
              }}
              editable={true}
              tooltip={t("projects.create-project.description-tooltip")}
            />
          </View>
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
        <StyledButton
          text={t("button.next")}
          icon="arrow-right"
          onPress={() => {
            showImages ? handleCreate() : setShowImages(true);
          }}
          isLoading={isLoading || isUploadingImages}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ProjectCreate;

const styles = StyleSheet.create({
  titleTextInput: {
    fontSize: 25,
    height: 100,
    padding: 10,
    borderRadius: 7,
    textAlignVertical: "top",
  },
  desciptionTextInput: {
    fontSize: 16,
    minHeight: "40%",
    padding: 10,
    borderRadius: 7,
    textAlignVertical: "top",
  },
  mainImage: {
    borderRadius: 7,
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: "5%",
    paddingTop: "10%",
    gap: 25,
    justifyContent: "space-between",
  },
});
