import { useGetMedia } from "@/components/Account/Common/Media/mediaHelper";
import Media from "@/components/MediaViewer/Media";
import { useTheme } from "@/components/Themes/theme";
import { Dispatch, FC, SetStateAction } from "react";
import { Text, StyleSheet, View } from "react-native";

type CompleteProjectUploadPhotoProps = {
  uris: string[];
  setUris: Dispatch<SetStateAction<string[]>>;
};

const CompleteProjectUploadPhoto: FC<CompleteProjectUploadPhotoProps> = ({
  uris,
  setUris
}) => {
  const theme = useTheme();
  const getMedia = useGetMedia(setUris, true);

  return (
    <>
      <Text
        style={{
          ...theme.customFonts.secondary.large,
          fontWeight: "400",
          fontSize: 35,
          marginBottom: 10,
        }}
      >
        Upload Project Images
      </Text>
      <Text
        style={{
          ...theme.customFonts.primary.small,
          fontWeight: "500",
          fontSize: 14,
          marginBottom: 50,
        }}
      >
        Upload up to two pictures and videos of your project. This would ideally be the finished product, but could also just be progress evidence or BTS from the production.
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
    </>
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
    height: "25%",
    padding: 10,
    borderRadius: 7,
  },
  mainImage: {
    marginVertical: 10,
    height: "35%",
    borderRadius: 7,
  },
});
