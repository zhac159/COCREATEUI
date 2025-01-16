import { FC } from "react";
import { StyleSheet } from "react-native";
import { Theme } from "@react-navigation/native";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import { Skills } from "../constants/skill/skills";
import { useSkillGroupGetColour } from "../hooks/skills/useSkillGroupGetColour";
import StyledButton, {
  StyledButtonProps,
} from "./StyledComponents/StyledButton";
import { skillsToIconMapping } from "../constants/skill/skillsToIconMapping";
import { skillGroupMap } from "../constants/skill/skillToGroupMap";
import { useTranslation } from "react-i18next";

type SkillTagButton = Omit<StyledButtonProps, "text"> & {
  skill: Skills;
  selected?: boolean;
};

export const SkillTag: FC<SkillTagButton> = ({
  skill,
  style,
  textStyle,
  iconStyle,
  selected,
  ...props
}) => {
  const { t } = useTranslation();
  const getSkillGroupColor = useSkillGroupGetColour();

  const styles = useThemedStyles((theme) =>
    getStyles(theme, getSkillGroupColor(skillGroupMap[skill]), selected)
  );

  return (
    <StyledButton
      text={t(`skills.${skill}`)}
      icon={skillsToIconMapping[skill]}
      textStyle={[styles.textStyles, textStyle]}
      iconStyle={[styles.iconStyles, iconStyle]}
      style={[styles.button, style]}
      {...props}
    />
  );
};

const getStyles = (theme: Theme, groupColor: string, selected?: boolean) =>
  StyleSheet.create({
    button: {
      justifyContent: "flex-start",
      backgroundColor: selected ? groupColor : theme.colors.backgroundColor,
      borderRadius: 14,
      paddingVertical: 12,
      paddingLeft: 12,
      paddingRight: 12,
      minWidth: 180,
      elevation: 5,
    },
    textStyles: {
      color: selected ? theme.colors.white : theme.colors.black,
      fontSize: 13,
    },
    iconStyles: {
      backgroundColor: selected ? theme.colors.backgroundColor : groupColor,
      color: selected ? theme.colors.black : theme.colors.white,
      borderRadius: 50,
      padding: 10,
    },
  });
