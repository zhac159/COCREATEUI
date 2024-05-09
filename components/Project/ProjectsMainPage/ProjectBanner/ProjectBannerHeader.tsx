import { FC } from "react";
import { useTheme } from "../../../Themes/theme";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { IconButton } from "react-native-paper";
import { useRouter } from "expo-router";

type ProjectBannerHeaderProps = {
  onCreate: (createMode: boolean) => void;
  onEdit: (editMode: boolean) => void;
};

const ProjectBannerHeader: FC<ProjectBannerHeaderProps> = ({
  onCreate,
  onEdit,
}) => {
  const theme = useTheme();

  const router = useRouter();

  return (
    <View
      style={{
        ...styles.header,
      }}
    >
      <Text
        style={{
          ...theme.customFonts.primary.medium,
          color: theme.colors.white,
          fontSize: 25,
        }}
      >
        Your Projects
      </Text>
      <View
        style={{
          gap: 16,
        }}
      >
        <IconButton
          icon={() => (
            <FontAwesome6
              name="plus"
              size={18}
              color={theme.colors.white}
              solid
            />
          )}
          onPress={() => onCreate(true)}
          size={30}
          style={{
            backgroundColor: theme.colors.primary,
            margin: 0,
          }}
        />
        <IconButton
          icon={() => (
            <FontAwesome6
              name="pen"
              size={18}
              color={theme.colors.black}
              solid
            />
          )}
          onPress={() => onEdit(true)}
          size={30}
          style={{
            backgroundColor: theme.colors.white,
            margin: 0,
          }}
        />
      </View>
    </View>
  );
};

export default ProjectBannerHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
