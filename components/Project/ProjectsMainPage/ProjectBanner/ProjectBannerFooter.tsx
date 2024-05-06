import { FC } from "react";
import { useTheme } from "../../../Themes/theme";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { IconButton } from "react-native-paper";
import { useRouter } from "expo-router";

type ProjectBannerFooterProps = {
  onEdit: (editMode: boolean) => void;
  id: number;
};

const ProjectBannerFooter: FC<ProjectBannerFooterProps> = ({ onEdit, id }) => {
  const theme = useTheme();

  const router = useRouter();

  const navigateToCompleteProjectForm = () => {
    router.navigate({
      pathname: "/main/assetFinder",
      params: {
        projectId: id,
      },
    });
  };

  return (
    <View
      style={{
        ...styles.footer,
      }}
    >
      <TouchableOpacity
        style={{
          ...styles.findAssetButton,
          backgroundColor: theme.colors.darkerGray,
        }}
        onPress={navigateToCompleteProjectForm}
      >
        <Text
          style={{
            ...theme.customFonts.primary.medium,
            color: theme.colors.white,
            fontSize: 20,
          }}
        >
          Find Assets
        </Text>
      </TouchableOpacity>
      <IconButton
        icon={() => (
          <FontAwesome6 name="pen" size={18} color={theme.colors.black} solid />
        )}
        onPress={() => onEdit(true)}
        size={25}
        style={{
          backgroundColor: theme.colors.white,
          margin: 0,
        }}
      />
    </View>
  );
};

export default ProjectBannerFooter;

const styles = StyleSheet.create({
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
});
