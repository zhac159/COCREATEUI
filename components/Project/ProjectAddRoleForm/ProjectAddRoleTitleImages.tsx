import { useGetMedia } from "@/components/Account/Common/Media/mediaHelper";
import {
  Skills,
  getSkillGroupColor,
  skillGroupMap,
} from "@/components/Account/Skills/skillHelper";
import Media from "@/components/MediaViewer/Media";
import { useTheme } from "@/components/Themes/theme";
import { Dispatch, FC, SetStateAction } from "react";
import { Text, StyleSheet, View } from "react-native";

type ProjectAddRoleImagesProps = {
  uris: string[];
  setUris: Dispatch<SetStateAction<string[]>>;
  skill: Skills | undefined;
};

const ProjectAddRoleImages: FC<ProjectAddRoleImagesProps> = ({
  uris,
  setUris,
  skill,
}) => {
  const theme = useTheme();
  const getMedia = useGetMedia(setUris, true);

  const skillGroupType = skillGroupMap[skill || 0];
  const color =
    skill === undefined
      ? theme.colors.lightestGray
      : getSkillGroupColor(skillGroupType, 0.12);

  return (
    <>
      <Text
        style={{
          ...theme.customFonts.secondary.large,
          fontWeight: "400",
          fontSize: 35,
        }}
      >
        Add Role Picture
      </Text>
      <View
        style={{
          borderRadius: 7,
          height: "50%",
        }}
      >
        <Media
          onPress={() => getMedia(0)}
          uri={uris[0]}
          style={styles.mainImage}
          editMode={true}
          backgroundColor={color}
        />
      </View>
    </>
  );
};

export default ProjectAddRoleImages;

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
