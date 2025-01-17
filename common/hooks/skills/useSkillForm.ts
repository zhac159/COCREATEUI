import { SkillGroups } from "@/common/constants/skill/skillGroup";
import { Skills } from "@/common/constants/skill/skills";
import { skillGroupMap } from "@/common/constants/skill/skillToGroupMap";
import { useEffect, useState } from "react";

export enum SkillFormType {
  Single,
  Multiple,
}

export const useSkillForm = (skillFormType: SkillFormType) => {
  const [selectedSkills, setSelectedSkill] = useState<Skills[]>([]);
  const [selectableSkills, setSelectableSkills] = useState<Skills[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<SkillGroups>(0);

  const selectSkill = (skill: Skills) => {
    if (skillFormType === SkillFormType.Single) {
      setSelectedSkill([skill]);
    } else {
      setSelectedSkill((prev) => {
        const skillIndex = prev.indexOf(skill);
        if (skillIndex > -1) {
          return prev.filter((s) => s !== skill);
        }
        return [...prev, skill];
      });
    }
  };

  // Gets List of skills based on selected group
  useEffect(() => {
    const filteredSkills = Object.entries(skillGroupMap)
      .filter(([_, group]) => group === selectedGroup)
      .map(([skill]) => Number(skill) as Skills);

    setSelectableSkills(filteredSkills);
  }, [selectedGroup]);

  const skillGroups: SkillGroups[] = Object.values(SkillGroups).filter(
    (value) => typeof value === "number"
  ) as SkillGroups[];

  return {
    selectedSkills,
    selectSkill,
    selectableSkills,
    selectedGroup,
    setSelectedGroup,
    skillGroups,
    setSelectedSkill
  };
};
