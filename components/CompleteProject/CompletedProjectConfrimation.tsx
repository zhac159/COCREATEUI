import { ProjectDTO } from "@/common/api/model";
import { FC } from "react";
import { Text } from "react-native";
import { useTheme } from "../Themes/theme";


type CompletedProjectConfirmationProps = {
  project: ProjectDTO;
};

const CompletedProjectConfirmation: FC<CompletedProjectConfirmationProps> = ({
  project,
}) => {
  const theme = useTheme();

  return (
    <>
      <Text
        style={{
          ...theme.customFonts.secondary.large,
          fontWeight: "400",
          fontSize: 35,
          marginBottom: 10,
        }}
      >
        Project Completed
      </Text>
      <Text
        style={{
          ...theme.customFonts.primary.small,
          fontWeight: "500",
          fontSize: 14,
          marginBottom: 50,
        }}
      >
        Congratulations! You have successfully completed your project. You can now review the project and submit it for review.
      </Text>
    </>
  );
};

export default CompletedProjectConfirmation;
