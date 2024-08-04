import { ProjectDTO } from "@/common/api/model";
import { FC } from "react";
import { Text, View } from "react-native";
import { useTheme } from "../Themes/theme";

type CompletedProjectConfirmationProps = {
  project: ProjectDTO;
  description: string;
};

const CompletedProjectConfirmation: FC<CompletedProjectConfirmationProps> = ({
  project,
}) => {
  const theme = useTheme();

  return (
    <View
      style={{
        gap: 20,
        marginBottom: 100,
      }}
    >
      <Text
        style={{
          ...theme.customFonts.secondary.large,
          fontWeight: "400",
          fontSize: 35,
        }}
      >
        Project Completed
      </Text>
      <Text
        style={{
          ...theme.customFonts.primary.small,
          fontWeight: "500",
          fontSize: 14,
        }}
      >
        Congratulations! You have successfully completed your project. Credits
        will now be handed out to your team.
      </Text>
    </View>
  );
};

export default CompletedProjectConfirmation;
