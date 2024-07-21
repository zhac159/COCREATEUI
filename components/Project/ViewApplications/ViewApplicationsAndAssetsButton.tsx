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
  projectId: number;
};

const ViewApplicationsAndAssetsButton: FC<ViewApplicationsAndAssetsButtonProps> = ({
  onPress,
  assetMode,
  projectId
}) => {
  const theme = useTheme();

  const router = useRouter(); 

  const navigateToCompleteProjectForm = () => {
    router.navigate({
      pathname: "/main/assetFinder",
      params: {
        projectId,
      },
    });
  };

  return (
    <TouchableOpacity
      style={{
        ...styles.viewApplicationContainer,
        backgroundColor: theme.colors.lightGray,
      }}
      onPress={
        assetMode ? navigateToCompleteProjectForm : onPress
      } 
    >
      <Text
        style={{
          ...styles.viewApplicationsText,
          ...theme.customFonts.primary.medium,
          color: theme.colors.black,
        }}
      >
        {assetMode ? "View Assets" : "View Applications"}
      </Text>
      <FontAwesome6
        name="arrow-right"
        style={{
          ...styles.viewApplicationsRightArrow,
          color: theme.colors.black,
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
    width: "100%",
    alignSelf: "center",
    marginBottom: 20
  },
  viewApplicationsRightArrow: {
    paddingRight: 16,
    fontWeight: "bold",
    fontSize: 20,
  },
});
