import { SkillDTO, SkillType } from "@/common/api/model";
import { FC, useState } from "react";
import { StyleSheet } from "react-native";
import FlipCard from "react-native-flip-card";
import SkillForm from "./SkillForm";
import SkillFrontSide from "./SkillFrontSide";

type SkillProps = {
  skill: SkillDTO;
  editMode: boolean;
  deselectSkill?: (skillDTO: SkillDTO) => void;
  selectSkill?: (skillDTO: SkillDTO) => void;
  selectedSkill?: SkillType;
  flipMode?: boolean;
};

const Skill: FC<SkillProps> = ({
  skill,
  editMode,
  deselectSkill,
  selectSkill,
  selectedSkill,
  flipMode = false,
}) => {
  if (
    !skill ||
    skill.skillGroupType === undefined ||
    skill.skillType == undefined
  )
    return null;

  const [flip, setFlip] = useState(false);

  if (flipMode) {
    return (
      <FlipCard flipVertical={false} flipHorizontal={true} flip={flip}>
        <SkillFrontSide
          skill={skill}
          editMode={editMode}
          deselectSkill={deselectSkill}
          selectSkill={selectSkill ?? (() => setFlip(true))}
          selectedSkill={selectedSkill}
          flipMode={flipMode}
        />
        <SkillForm onClose={() => setFlip(false)} skill={skill} />
      </FlipCard>
    );
  }

  return (
    <SkillFrontSide
      skill={skill}
      editMode={editMode}
      deselectSkill={deselectSkill}
      selectSkill={selectSkill}
      selectedSkill={selectedSkill}
    />
  );
};

export default Skill;

export const skillStyles = StyleSheet.create({
  skillContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    gap: 11,
    paddingHorizontal: 15,
    paddingVertical: 11,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    elevation: 5,
    shadowOpacity: 0.05,
    shadowRadius: 6,
    position: "relative",
  },
  deleteIconButton: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "red",
    borderRadius: 50,
    padding: 5,
  },
});
