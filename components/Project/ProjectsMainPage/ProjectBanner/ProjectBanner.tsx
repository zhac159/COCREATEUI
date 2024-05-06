import { FC } from "react";
import { useTheme } from "../../../Themes/theme";
import { View, Text, StyleSheet } from "react-native";
import Media from "../../../MediaViewer/Media";
import ProjectBannerHeader from "./ProjectBannerHeader";
import CompleteProjectButton from "./CompleteProjectButton";
import ProjectBannerFooter from "./ProjectBannerFooter";

type ProjectBannerProps = {
  id: number;
  name: string | undefined | null;
  onCreate: (createMode: boolean) => void;
  onEdit: (editMode: boolean) => void;
  uri: string | undefined | null;
};

const ProjectBanner: FC<ProjectBannerProps> = ({
  id,
  name,
  onCreate,
  onEdit,
  uri,
}) => {
  const theme = useTheme();

  return (
    <View style={styles.imageContainer} key={uri}>
      <Media uri={uri} style={{ flex: 1 }} />
      <View
        style={{
          ...styles.content,
        }}
      >
        <ProjectBannerHeader onCreate={onCreate} />
        <View>
          <CompleteProjectButton id={id} />
          <Text
            style={{
              ...theme.customFonts.secondary.medium,
              ...styles.name,
              color: theme.colors.white,
            }}
          >
            {name}
          </Text>
          <ProjectBannerFooter onEdit={onEdit} id={id} />
        </View>
      </View>
    </View>
  );
};

export default ProjectBanner;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    flex: 1,
    padding: 0,
  },
  imageContainer: {
    height: 400,
    width: "100%",
  },
  name: {
    fontSize: 40,
    paddingBottom: 20,
    fontWeight: "400",
  },
  content: {
    position: "absolute",
    width: "100%",
    height: "100%",
    paddingTop: "15%",
    paddingBottom: "5%",
    paddingHorizontal: "5%",
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    alignSelf: "flex-end",
    alignContent: "center",
  },
  findAssetButton: {
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  finishProjectButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    maxWidth: 170,
    marginBottom: 10,
  },
});
