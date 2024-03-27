import { Skills, getSkillGroupColor, skillGroupMap } from "@/components/Account/Skills/skillHelper";
import { useTheme } from "@/components/Themes/theme";
import { Dispatch, FC, SetStateAction } from "react";
import { Text, StyleSheet, TextInput } from "react-native";

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

  const skillGroupType = skillGroupMap[skill || 0];
  const color = skill === undefined ? theme.colors.lightestGray:getSkillGroupColor(skillGroupType, 0.12);

  return (
    <>
      <Text
        style={{
          ...theme.customFonts.secondary.large,
          fontWeight: "400",
          fontSize: 35,
        }}
      >
        Add Keywords
      </Text>
      <Text
        style={{
          ...theme.customFonts.primary.medium,
          fontWeight: "500",
          fontSize: 14,
        }}
      >
        What is Your Project About
      </Text>
      <TextInput
        style={{
          ...theme.customFonts.primary.medium,
          ...styles.titleTextInput,
          color: theme.colors.black,
          backgroundColor: color,
        }}
        numberOfLines={14}
        multiline={true}
        value={keywords}
        onChangeText={(text) => {
          if (text.length <= 30) {
            setKeywords(text);
          }
        }}
        placeholder="Add, Keywords, Separated By, Commas"
      />
    </>
  );
};

export default ProjectAddRoleKeywords;

const styles = StyleSheet.create({
  titleTextInput: {
    fontSize: 25,
    height: "12%",
    padding: 10,
    borderRadius: 7,
  },
  desciptionTextInput: {
    fontSize: 16,
    height: "25%",
    padding: 10,
    borderRadius: 7,
  },
  mainImage: {
    borderRadius: 7,
    flex: 1,
  },
});
