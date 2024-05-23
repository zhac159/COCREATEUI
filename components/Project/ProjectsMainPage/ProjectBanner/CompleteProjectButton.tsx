import { FC } from "react";
import { useTheme } from "../../../Themes/theme";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import ButtonWithIcon from "@/components/Common/ButtonWithIcon";
import { IconButton } from "react-native-paper";

type CompleteProjectButtonProps = {
  id: number;
};

const CompleteProjectButton: FC<CompleteProjectButtonProps> = ({ id }) => {
  const theme = useTheme();

  const router = useRouter();

  const navigateToCompleteProjectForm = () => {
    router.navigate({
      pathname: "/main/completeProject",
      params: {
        projectId: id,
      },
    });
  };

  return (
    <IconButton
      icon={() => (
        <FontAwesome6 name="check" size={18} color={theme.colors.black} solid />
      )}
      onPress={navigateToCompleteProjectForm}
      size={30}
      style={{
        backgroundColor: "gold",
        margin: 0,
      }}
    />
  );
};

export default CompleteProjectButton;
