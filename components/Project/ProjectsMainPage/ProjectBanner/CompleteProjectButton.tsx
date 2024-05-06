import { FC } from "react";
import { useTheme } from "../../../Themes/theme";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import ButtonWithIcon from "@/components/Common/ButtonWithIcon";

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
    <ButtonWithIcon
      text="Finish Project"
      icon="check"
      onPress={navigateToCompleteProjectForm}
    />
  );
};

export default CompleteProjectButton;
