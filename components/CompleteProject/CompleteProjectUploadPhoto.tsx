import { useGetMedia } from "@/components/Account/Common/Media/mediaHelper";
import Media from "@/components/MediaViewer/Media";
import { useTheme } from "@/components/Themes/theme";
import { Dispatch, FC, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { Text, StyleSheet, View } from "react-native";

type CompleteProjectUploadPhotoProps = {
  uris: string[];
  setUris: Dispatch<SetStateAction<string[]>>;
  projectName?: string;
  isCompletingRole?: boolean;
};

const CompleteProjectUploadPhoto: FC<CompleteProjectUploadPhotoProps> = ({
  uris,
  setUris,
  projectName,
  isCompletingRole,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const getMedia = useGetMedia(setUris, true);
  console.log("uris", projectName);
  return (
    <View>
      <Text
        style={{
          ...theme.customFonts.secondary.large,
          fontWeight: "400",
          width: "90%",
          fontSize: 35,
        }}
      >
        {isCompletingRole
          ? t("projects.complete-role.upload-image-title", {
              projectName: projectName,
            })
          : t("projects.complete-project.upload-image-title")}
      </Text>
      <Text
        style={{
          ...theme.customFonts.primary.small,
          fontWeight: "500",
          fontSize: 14,
          paddingVertical: "2%",
          marginBottom: 20,
        }}
      >
        Upload up to two pictures and videos of your project. This would ideally
        be the finished product, but could also just be progress evidence or BTS
        from the production.
      </Text>
      <Media
        onPress={() => getMedia(0)}
        uri={uris[0]}
        style={styles.mainImage}
        editMode={true}
      />
      <Media
        onPress={() => getMedia(1)}
        uri={uris[1]}
        style={styles.mainImage}
        editMode={true}
      />
    </View>
  );
};

export default CompleteProjectUploadPhoto;

const styles = StyleSheet.create({
  titleTextInput: {
    fontSize: 25,
    height: "12%",
    padding: 10,
    borderRadius: 7,
  },
  desciptionTextInput: {
    fontSize: 16,
    height: 350,
    padding: 10,
    borderRadius: 7,
  },
  mainImage: {
    marginVertical: 10,
    height: 350,
    borderRadius: 7,
  },
});
