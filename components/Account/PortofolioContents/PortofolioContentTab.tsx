import {
  useAboutYouState,
  usePortfolioContentsState,
  usePortfolioContentsValue,
} from "@/components/RecoilStates/profileState";
import { View, Text, TextInput, StyleSheet } from "react-native";
import TabHeaderButtons from "../Common/TabHeaderButtons";
import { useState } from "react";
import { useTheme } from "@/components/Themes/theme";
import PortofolioContent from "./PortofolioContent";
import NewPortofolioContentForm from "./NewPortofolioContentForm";
import { MediaCreateDTO, PrepareUploadDTO } from "@/common/api/model";
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

const PortofolioContentTab = () => {
  const [editMode, setEditMode] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const [create, setCreate] = useState<() => void>(() => null);
  const [uris, setUris] = useState<string[]>([]);
  const theme = useTheme();

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

    setUris(newUris);

    const prepareUploadDTOs: PrepareUploadDTO[] = newUris.map((uri) => ({
      entity: EntityType.PORTOFOLIOCONTENT,
      mediaType: getMediaTypeFromUri(uri),
    }));

    prepareDownlaod({ data: prepareUploadDTOs });

    setEditMode(false);
  };

  const { mutate: updatePortofolioContent } = usePutApiUserPortofolio({
    mutation: {
      onSuccess: (data) => {
        setPortofolioContents(data.portofolioContents);
        setAboutYou(data.aboutYou);
      },
    },
  });

  const { mutate: prepareDownlaod } = usePostApiPrepare({
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
          if (!portofolioContents) return;
          const newPortofolioContents = portofolioContents.map((content) => {
            return {
              ...content,
              medias: content.medias?.map((media) => {
                if (media.uri && !media.uri.startsWith("http")) {
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

  return (
    <View
      style={{
        flex: 1,
        flexGrow: 1,
        justifyContent: "flex-start",
      }}
    >
      <TabHeaderButtons
        editMode={editMode}
        setEditMode={setEditMode}
        showPlayButton={true}
        disableEditMode={false}
        createMode={createMode}
        setCreateMode={setCreateMode}
        onDone={() => (editMode ? handleUpdatePortofolioContent() : create())}
      />
      {createMode ? (
        <NewPortofolioContentForm
          setCreate={setCreate}
          setCreateMode={setCreateMode}
        />
      ) : (
        <>
          {editMode ? (
            <TextInput
              style={{
                ...theme.customFonts.primary.medium,
                ...styles.titleTextInput,
                color: theme.colors.black,
                backgroundColor: theme.colors.lightestGray,
              }}
              numberOfLines={14}
              multiline={true}
              value={newAboutYou}
              onChangeText={(text) => {
                if (text.length <= 30) {
                  setNewAboutYou(text);
                }
              }}
            />
          ) : (
            <Text
              style={{
                ...theme.customFonts.primary.small,
                fontSize: 14,
                padding: 10,
              }}
              numberOfLines={14}
              ellipsizeMode="tail"
            >
              {newAboutYou}
            </Text>
          )}
          {portofolioContents &&
            portofolioContents.map((content, index) => (
              <PortofolioContent
                key={index}
                portofolioContent={content}
                editMode={editMode}
              />
            ))}
        </>
      )}
    </View>
  );
};

export default PortofolioContentTab;

const styles = StyleSheet.create({
  titleTextInput: {
    fontSize: 14,
    padding: 10,
    height: 269,
    borderRadius: 7,
  },
});
