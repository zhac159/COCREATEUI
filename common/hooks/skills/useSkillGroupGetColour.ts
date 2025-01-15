import { SkillGroups } from "@/common/constants/skill/skillGroup";
import { useTheme } from "@react-navigation/native";
import { useCallback } from "react";

export const useSkillGroupGetColour = () => {
  const theme = useTheme();

  return useCallback(
    (skillGroup: SkillGroups) => {
      switch (skillGroup) {
        case SkillGroups.Filmmaking:
          return theme.colors.primary;
        case SkillGroups.Acting:
          return theme.colors.red;
        default:
          return theme.colors.primary;
      }
    },
    [theme]
  );
};
