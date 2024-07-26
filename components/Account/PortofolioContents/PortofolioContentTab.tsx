import {
  useAboutYouState,
  usePortfolioContentsState,
} from "@/components/RecoilStates/profileState";
import { View, StyleSheet } from "react-native";
import TabHeaderButtons from "../Common/TabHeaderButtons";
import { useState } from "react";
import { useTheme } from "@/components/Themes/theme";
import PortofolioContent from "./PortofolioContent";
import { PrepareUploadDTO } from "@/common/api/model";
import { EntityType } from "../Common/Media/EntityType";
import {
  getCleanUrl,
  getMediaTypeFromUri,
  uploadFiles,
} from "../Common/Media/mediaHelper";
import {
  usePostApiPrepare,
  usePutApiUserPortofolio,
} from "@/common/api/endpoints/cocreateApi";
import useNewPortofolioContentForm from "./useNewPortofolioContentForm";
import StyledButton from "@/components/Common/StyledButton";
import StyledTextField from "@/components/Common/StyledTextField";

const PortofolioContentTab = () => {
  const [editMode, setEditMode] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const [uris, setUris] = useState<string[]>([]);
  const theme = useTheme();

  const {
    FormNode: NewPortofolioContentForm,
    handleCreate: submitCreate,
    isLoading: createIsLoading,
  } = useNewPortofolioContentForm();

  const [aboutYou, setAboutYou] = useAboutYouState();
  const [newAboutYou, setNewAboutYou] = useState<string>(aboutYou || "");

  const [portofolioContents, setPortofolioContents] =
    usePortfolioContentsState();

  const handleUpdatePortofolioContent = () => {
    const newUris: string[] = [];

    if (!portofolioContents) return;

    portofolioContents.forEach((content) => {
      content.medias?.forEach((media) => {
        if (media.uri && !media.uri.startsWith("http")) {
          newUris.push(media.uri);
        }
      });
    });

    const prepareUploadDTOs: PrepareUploadDTO[] = newUris.map((uri) => ({
      entity: EntityType.PORTOFOLIOCONTENT,
      mediaType: getMediaTypeFromUri(uri),
    }));

    prepareUpload({ data: prepareUploadDTOs });

    setEditMode(false);
  };

  const { mutate: updatePortofolioContent } = usePutApiUserPortofolio({
    mutation: {
      onSuccess: (data) => {
        setPortofolioContents(data.portofolioContents || []);
        setAboutYou(data.aboutYou);
      },
    },
  });

  const { mutate: prepareUpload } = usePostApiPrepare({
    mutation: {
      onSuccess: async (data) => {
        const sasURIs = data.sasURIs;

        if (sasURIs) {
          setUris((state) => {
            uploadFiles(data.sasURIs || [], state);
            return state;
          });

          const cleanUris = sasURIs.map((uri) => getCleanUrl(uri || ""));

          let index = 0;

          const newPortofolioContents = portofolioContents.map((content) => {
            return {
              ...content,
              medias: content.medias?.map((media) => {
                if (!media.uri.startsWith("http")) {
                  const newMedia = { ...media, uri: cleanUris[index] };
                  index++;
                  return newMedia;
                }
                return media;
              }),
            };
          });

          updatePortofolioContent({
            data: {
              aboutYou: newAboutYou,
              portofolioContents: newPortofolioContents,
            },
          });
        }
      },
    },
  });

  const handleCreate = async () => {
    await submitCreate();
    setCreateMode(false);
  };

  if (createMode || createIsLoading) {
    return (
      <View style={styles.container}>
        <View>
          <StyledButton
            text="Done"
            onPress={handleCreate}
            style={{
              alignSelf: "flex-end",
              backgroundColor: theme.colors.primary,
              marginVertical: 10,
            }}
            isLoading={createIsLoading}
          />
          {NewPortofolioContentForm}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TabHeaderButtons
        editMode={editMode}
        setEditMode={setEditMode}
        showPlayButton={true}
        setCreateMode={setCreateMode}
        disableEditMode={false}
        createMode={createMode}
        onDone={handleUpdatePortofolioContent}
      />
      <StyledTextField
        editable={editMode}
        value={newAboutYou}
        textInputProps={{
          style: {
            ...theme.customFonts.primary.medium,
            ...styles.titleTextInput,
            color: theme.colors.black,
            backgroundColor: theme.colors.lightestGray,
          },
          numberOfLines: 14,
          multiline: true,
          onChangeText: (text) => {
            if (text.length <= 500) {
              setNewAboutYou(text);
            }
          },
        }}
        textProps={{
          style: {
            ...theme.customFonts.primary.small,
            ...styles.titleText,
          },
          numberOfLines: 14,
          ellipsizeMode: "tail",
        }}
      />
      {portofolioContents.map((content, index) => (
        <PortofolioContent
          key={index}
          portofolioContent={content}
          editMode={editMode}
        />
      ))}
    </View>
  );
};

export default PortofolioContentTab;

const styles = StyleSheet.create({
  titleTextInput: {
    fontSize: 14,
    textAlignVertical: "top",
    padding: 2,
    height: 269,
    borderRadius: 7,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "700",
    padding: 10,
    textAlignVertical: "top",
  },
  container: {
    flex: 1,
    flexGrow: 1,
    justifyContent: "flex-start",
  },
});
