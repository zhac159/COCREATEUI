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

type ProjectAddRoleTitleDescriptionProps = {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  skill: Skills | undefined;
};

const ProjectAddRoleTitleDescription: FC<
  ProjectAddRoleTitleDescriptionProps
> = ({ title, setTitle, description, setDescription, skill }) => {
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
        {t("projects.add-role.title-description-form-header")}
      </Text>
      <StyledTextField
        textInputProps={{
          style: {
            ...theme.customFonts.primary.medium,
            ...styles.titleTextInput,
            color: theme.colors.black,
            textAlignVertical: "top",
            backgroundColor: color,
          },
          numberOfLines: 14,
          multiline: true,
          value: title,
          onChangeText: (text) => {
            if (text.length <= 30) {
              setTitle(text);
            }
          },
          placeholder: t("projects.add-role.title-placeholder"),
        }}
        editable={true}
        tooltip={t("projects.add-role.title-tooltip")}
      />
      <StyledTextField
        textInputProps={{
          style: {
            ...theme.customFonts.primary.medium,
            ...styles.desciptionTextInput,
            color: theme.colors.black,
            textAlignVertical: "top",
            backgroundColor: color,
          },
          numberOfLines: 14,
          multiline: true,
          value: description,
          onChangeText: (text) => {
            if (text.length <= 30) {
              setDescription(text);
            }
          },
          placeholder: t("projects.add-role.description-placeholder"),
        }}
        editable={true}
        tooltip={t("projects.add-role.description-tooltip")}
      />
    </View>
  );
};

export default ProjectAddRoleTitleDescription;

const styles = StyleSheet.create({
  titleTextInput: {
    fontSize: 25,
    height: 100,
    padding: 10,
    borderRadius: 7,
  },
  desciptionTextInput: {
    fontSize: 16,
    height: 150,
    padding: 10,
    borderRadius: 7,
  },
  mainImage: {
    borderRadius: 7,
    flex: 1,
  },
});
