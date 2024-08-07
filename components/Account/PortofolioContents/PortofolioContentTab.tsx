import {
  useAboutYouState,
  usePortfolioContentsValue,
} from "@/components/RecoilStates/profileState";
import { View, StyleSheet } from "react-native";
import TabHeaderButtons from "../Common/TabHeaderButtons";
import { useState } from "react";
import { useTheme } from "@/components/Themes/theme";
import PortofolioContent from "./PortofolioContent";
import { EntityType } from "../Common/Media/EntityType";
import { usePutApiUserPortofolio } from "@/common/api/endpoints/cocreateApi";
import useNewPortofolioContentForm from "./useNewPortofolioContentForm";
import StyledButton from "@/components/Common/StyledButton";
import StyledTextField from "@/components/Common/StyledTextField";
import { useTranslation } from "react-i18next";
import {
  applyNewUrlsToPortofolioContents,
  getUpdatedImages,
} from "./portofolioContentHelper";
import { usePrepareAndUpload } from "@/common/media/mediaHooks";

const PortofolioContentTab = () => {
  const theme = useTheme();

  const { t } = useTranslation();

  const {
    upload,
    filesUploadingStatus,
    isLoading: isFilesUploadingLoading,
  } = usePrepareAndUpload(EntityType.PORTOFOLIOCONTENT, (urls) => {
    setEditMode(false);
  });

  const [editMode, setEditMode] = useState(false);
  const [createMode, setCreateMode] = useState(false);

  const {
    FormNode: NewPortofolioContentForm,
    handleCreate: submitCreate,
    isLoading: createIsLoading,
    reset,
  } = useNewPortofolioContentForm();

  const [aboutYou, setAboutYou] = useAboutYouState();
  const [newAboutYou, setNewAboutYou] = useState<string>(aboutYou || "");

  const portofolioContents = usePortfolioContentsValue();

  const { mutate: updatePortofolioContent } = usePutApiUserPortofolio({
    mutation: {
      onSuccess: (data) => {
        setAboutYou(data.aboutYou);
      },
    },
  });

  const handleUpdatePortofolioContent = async () => {
    const newUris = getUpdatedImages(portofolioContents);
    const uploadedFilesUrls = await upload(newUris);
    const updatedPortofolioContents = applyNewUrlsToPortofolioContents(
      portofolioContents,
      uploadedFilesUrls
    );
    updatePortofolioContent({
      data: {
        aboutYou: newAboutYou,
        portofolioContents: updatedPortofolioContents,
      },
    });
  };

  const handleCreate = async () => {
    await submitCreate();
    setCreateMode(false);
  };

  if (createMode || createIsLoading) {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignSelf: "flex-end",
            gap: 10,
          }}
        >
          <StyledButton
            text="Done"
            onPress={handleCreate}
            style={{
              ...styles.dontButton,
              backgroundColor: theme.colors.primary,
            }}
            isLoading={createIsLoading}
          />
          <StyledButton
            text="Cancel"
            onPress={() => {
              setCreateMode(false);
              reset();
            }}
            style={{
              ...styles.dontButton,
              backgroundColor: theme.colors.red,
            }}
          />
        </View>
        {NewPortofolioContentForm}
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
        isLoading={isFilesUploadingLoading}
      />
      <StyledTextField
        editable={editMode}
        value={newAboutYou}
        href
        onChangeText={setNewAboutYou}
        fontSize={20}
        textInputProps={{
          placeholder: t("account.portfolio.bio-placeholder"),
          multiline: true,
          numberOfLines: 5,
        }}
        textProps={{
          style: {
            paddingLeft: "2%",
          },
        }}
      />
      {portofolioContents.map((content, index) => (
        <PortofolioContent
          key={index}
          portofolioContent={content}
          editMode={editMode}
          filesUploadingStatus={filesUploadingStatus}
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
  dontButton: {
    marginTop: 10,
    marginBottom: "15%",
  },
});
