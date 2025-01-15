import { FC, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Theme } from "@react-navigation/native";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import { SkillType } from "@/api/model";
import { SkillTag } from "../SkillTag";
import {
  SkillFormType,
  useSkillForm,
} from "@/common/hooks/skills/useSkillForm";
import StyledButton from "../StyledComponents/StyledButton";
import { useTranslation } from "react-i18next";

type SkillFormFieldProps =
  | {
      skillFormType: SkillFormType.Single;
      value: SkillType;
      onChange: (value: SkillType) => void;
    }
  | {
      skillFormType: SkillFormType.Multiple;
      value: SkillType[];
      onChange: (value: SkillType[]) => void;
    };

export const SkillFormField: FC<SkillFormFieldProps> = ({
  onChange,
  value,
  skillFormType,
}) => {
  const styles = useThemedStyles(getStyles);
  const { t } = useTranslation();
  const {
    selectedSkills,
    selectSkill,
    setSelectedSkill,
    selectableSkills,
    skillGroups,
    setSelectedGroup,
  } = useSkillForm(skillFormType);

  useEffect(() => {
    if (skillFormType === SkillFormType.Single) {
      setSelectedSkill([value]);
    } else {
      setSelectedSkill(value);
    }
  }, []);

  useEffect(() => {
    if (skillFormType === SkillFormType.Single) {
      onChange(selectedSkills[0]);
    } else {
      onChange(selectedSkills);
    }
  }, [selectedSkills]);

  return (
    <View style={styles.container}>
      <View>
        {skillGroups.map((group, index) => (
          <StyledButton
            key={index}
            style={styles.groupButton}
            text={t(`skill-groups.${group}`)}
            textStyle={styles.groupButtonText}
            onPress={() => setSelectedGroup(group)}
          />
        ))}
      </View>
      <View style={styles.skillsContainer}>
        {selectableSkills.map((skill, index) => (
          <SkillTag
            key={index}
            skill={skill}
            onPress={() => selectSkill(skill)}
            style={styles.skill}
            textStyle={styles.skillText}
            selected={selectedSkills.includes(skill)}
          />
        ))}
      </View>
    </View>
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      flex: 1,
    },
    groupButton: {
      alignSelf: "flex-start",
      paddingHorizontal: 15,
      paddingVertical: 5,
      margin: 5,
    },
    groupButtonText: {
      alignSelf: "flex-start",
      textAlign: "left",
    },
    skill: {
      alignSelf: "flex-end",
      width: "100%",
    },
    skillText:{
      flexWrap: "wrap",
      width: "70%",
    },
    skillsContainer: {
      maxWidth: "50%",
      gap: 18,
    },
  });
