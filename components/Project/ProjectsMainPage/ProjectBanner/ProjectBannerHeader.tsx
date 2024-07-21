import { FC } from "react";
import { useTheme } from "../../../Themes/theme";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { IconButton } from "react-native-paper";
import { useRouter } from "expo-router";
import CompleteProjectButton from "./CompleteProjectButton";

type ProjectBannerHeaderProps = {
  onCreate: (createMode: boolean) => void;
  onEdit: (editMode: boolean) => void;
  id: number;
};

const ProjectBannerHeader: FC<ProjectBannerHeaderProps> = ({
  onCreate,
  onEdit,
  id,
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
        <View
          style={{ width: "50%", backgroundColor: theme.colors.gray, height: 2, alignSelf: "center" }}
        />
        <IconButton
          icon={() => (
            <FontAwesome6
              name="pen"
              size={18}
              color={theme.colors.white}
              solid
            />
          )}
          onPress={() => onEdit(true)}
          size={30}
          style={{
            backgroundColor: theme.colors.black,
            margin: 0,
          }}
        />
        <CompleteProjectButton id={id} />
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
