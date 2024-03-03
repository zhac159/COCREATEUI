import SkillsAddMenu from "@/components/Account/Skills/SkillsAddMenu";
import {
  Skills,
  getRestOfSkills,
} from "@/components/Account/Skills/skillHelper";
import { useTheme } from "@/components/Themes/theme";
import { Dispatch, FC, SetStateAction } from "react";
import { Text } from "react-native";

type ProjectAddRoleSkillProps = {
  skill: Skills | undefined;
  setSkill: Dispatch<SetStateAction<Skills | undefined>>;
};

const ProjectAddRoleSkill: FC<ProjectAddRoleSkillProps> = ({
  skill,
  setSkill,
}) => {
  const allSkills = getRestOfSkills([]);
  const theme = useTheme();

  return (
    <>
      <Text
        style={{
          ...theme.customFonts.secondary.large,
          fontWeight: "400",
          fontSize: 35,
        }}
      >
        What Skill Are You Looking For?
      </Text>
      <SkillsAddMenu
        restOfTheSkills={allSkills}
        show={true}
        selectSkill={(skillDTO) => {
          setSkill(skillDTO.skillType);
        }}
        selectedSkillType={skill}
      />
    </>
  );
};

export default ProjectAddRoleSkill;
