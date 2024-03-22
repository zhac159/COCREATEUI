import { useTheme } from "@/components/Themes/theme";
import { FontAwesome6 } from "@expo/vector-icons";
import { FC } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";

type ViewApplicationsButtonProps = {};

const ViewApplicationsButton: FC<ViewApplicationsButtonProps> = () => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={{
        ...styles.viewApplicationContainer,
        backgroundColor: theme.colors.black,
      }}
    >
      <Text
        style={{
          ...styles.viewApplicationsText,
          ...theme.customFonts.primary.medium,
          color: theme.colors.white,
        }}
      >
        View Applications
      </Text>
      <FontAwesome6
        name="arrow-right"
        style={{
          ...styles.viewApplicationsRightArrow,
          color: theme.colors.white,
        }}
      />
    </TouchableOpacity>
  );
};

export default ViewApplicationsButton;

const styles = StyleSheet.create({
  viewApplicationsText: {
    fontSize: 25,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 14,
    paddingLeft: 14,
  },
  viewApplicationContainer: {
    borderRadius: 14,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 41,
  },
  viewApplicationsRightArrow: {
    paddingRight: 16,
    fontWeight: "bold",
    fontSize: 25,
  },
});
