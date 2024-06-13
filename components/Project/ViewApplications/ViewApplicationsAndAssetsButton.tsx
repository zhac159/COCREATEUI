import { useTheme } from "@/components/Themes/theme";
import { FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FC } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";

type ViewApplicationsAndAssetsButtonProps = {
  onPress: () => void;
  assetMode?: boolean;
};

const ViewApplicationsAndAssetsButton: FC<ViewApplicationsAndAssetsButtonProps> = ({
  onPress,
  assetMode,
}) => {
  const theme = useTheme();

  const router = useRouter(); 

  const navigateToCompleteProjectForm = () => {
    router.navigate({
      pathname: "/main/assetFinder",
      params: {
        projectId: 1,
      },
    });
  };

  return (
    <TouchableOpacity
      style={{
        ...styles.viewApplicationContainer,
        backgroundColor: theme.colors.black,
      }}
      onPress={
        assetMode ? navigateToCompleteProjectForm : onPress
      } 
    >
      <Text
        style={{
          ...styles.viewApplicationsText,
          ...theme.customFonts.primary.medium,
          color: theme.colors.white,
        }}
      >
        {assetMode ? "View Assets" : "View Applications"}
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

export default ViewApplicationsAndAssetsButton;

const styles = StyleSheet.create({
  viewApplicationsText: {
    fontSize: 18,
    paddingTop: 12,
    paddingBottom: 12,
    paddingRight: 14,
    paddingLeft: 14,
  },
  viewApplicationContainer: {
    borderRadius: 14,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    width: "95%",
    alignSelf: "center",
    marginBottom: 20
  },
  viewApplicationsRightArrow: {
    paddingRight: 16,
    fontWeight: "bold",
    fontSize: 20,
  },
});
