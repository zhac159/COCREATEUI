import {
  Skills,
  getSkillGroupColor,
  skillGroupMap,
} from "@/components/Account/Skills/skillHelper";
import StyledTextField from "@/components/Common/StyledTextField";
import { useTheme } from "@/components/Themes/theme";
import { Dispatch, FC, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { Text, StyleSheet, TextInput, View } from "react-native";

type ProjectAddRoleKeywordsProps = {
  keywords: string;
  setKeywords: Dispatch<SetStateAction<string>>;
  skill: Skills | undefined;
};

const ProjectAddRoleKeywords: FC<ProjectAddRoleKeywordsProps> = ({
  keywords,
  setKeywords,
  skill,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const skillGroupType = skillGroupMap[skill || 0];
  const color =
    skill === undefined
      ? theme.colors.lightestGray
      : getSkillGroupColor(skillGroupType, 0.12);

  return (
    <View
      style={{
        gap: 50,
        marginBottom: 50,
      }}
    >
      <Text
        style={{
          ...theme.customFonts.secondary.large,
          fontWeight: "400",
          fontSize: 35,
        }}
      >
        {t("projects.add-role.keywords-title")}
      </Text>
      <StyledTextField
        textInputProps={{
          style: {
            ...theme.customFonts.primary.medium,
            ...styles.titleTextInput,
            color: theme.colors.black,
            backgroundColor: color,
            textAlignVertical: "top",
          },
          numberOfLines: 14,
          multiline: true,
          value: keywords,
          onChangeText: (text) => {
            if (text.length <= 30) {
              setKeywords(text);
            }
          },
          placeholder: t("projects.add-role.keywords-placeholder"),
        }}
        editable={true}
        tooltip={t("projects.add-role.keywords-tooltip")}
      />
    </View>
  );
};

export default ProjectAddRoleKeywords;

const styles = StyleSheet.create({
  titleTextInput: {
    fontSize: 25,
    textAlignVertical: "top",
    height: 300,
    padding: 10,
    borderRadius: 7,
  },
  mainImage: {
    borderRadius: 7,
    flex: 1,
  },
});
