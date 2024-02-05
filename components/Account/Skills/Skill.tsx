import { SkillDTO, SkillGroupType, SkillType } from "@/common/api/model";
import { FC } from "react";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Tags from "react-native-tags";
import { View } from "react-native";
import { TouchableOpacity } from "react-native";
import { Shadow } from "react-native-shadow-2";

export enum SkillGroups {
  Filmmaking,
  VisualArts,
  Fashion,
  Writing,
  PerformingArts,
  Music,
}

export enum Skills {
  Programming,
  Management,
  Acting,
  Painting,
  Writing,
  Singing,
  Dancing,
  Drawing,
  Photography,
  Directing,
  Producing,
  Editing,
  Cinematography,
  SoundEngineering,
  SoundDesign,
  SoundEditing,
  GameDesign,
}

const skillGroupMap = {
  [Skills.Programming]: SkillGroups.Filmmaking,
  [Skills.Management]: SkillGroups.Filmmaking,
  [Skills.Acting]: SkillGroups.PerformingArts,
  [Skills.Painting]: SkillGroups.VisualArts,
  [Skills.Writing]: SkillGroups.Writing,
  [Skills.Singing]: SkillGroups.Music,
  [Skills.Dancing]: SkillGroups.PerformingArts,
  [Skills.Drawing]: SkillGroups.VisualArts,
  [Skills.Photography]: SkillGroups.VisualArts,
  [Skills.Directing]: SkillGroups.Filmmaking,
  [Skills.Producing]: SkillGroups.Filmmaking,
  [Skills.Editing]: SkillGroups.Filmmaking,
  [Skills.Cinematography]: SkillGroups.Filmmaking,
  [Skills.SoundEngineering]: SkillGroups.Music,
  [Skills.SoundDesign]: SkillGroups.Music,
  [Skills.SoundEditing]: SkillGroups.Music,
  [Skills.GameDesign]: SkillGroups.Filmmaking,
};

export enum IconNames {
  Programming = "language-javascript",
  Management = "account-group",
  Acting = "drama-masks",
  Painting = "brush",
  Writing = "book-open-page-variant",
  Singing = "music-note",
  Dancing = "music-box",
  Drawing = "pencil",
  Photography = "camera",
  Directing = "movie-open",
  Producing = "filmstrip",
  Editing = "video-edit",
  Cinematography = "camera-iris",
  SoundEngineering = "volume-high",
  SoundDesign = "music-clef-treble",
  SoundEditing = "music-clef-bass",
  GameDesign = "gamepad-variant",
  Default = "help-circle",
}

export const getSkillIcon = (skill: Skills): IconNames => {
  switch (skill) {
    case Skills.Programming:
      return IconNames.Programming;
    case Skills.Management:
      return IconNames.Management;
    case Skills.Acting:
      return IconNames.Acting;
    case Skills.Painting:
      return IconNames.Painting;
    case Skills.Writing:
      return IconNames.Writing;
    case Skills.Singing:
      return IconNames.Singing;
    case Skills.Dancing:
      return IconNames.Dancing;
    case Skills.Drawing:
      return IconNames.Drawing;
    case Skills.Photography:
      return IconNames.Photography;
    case Skills.Directing:
      return IconNames.Directing;
    case Skills.Producing:
      return IconNames.Producing;
    case Skills.Editing:
      return IconNames.Editing;
    case Skills.Cinematography:
      return IconNames.Cinematography;
    case Skills.SoundEngineering:
      return IconNames.SoundEngineering;
    case Skills.SoundDesign:
      return IconNames.SoundDesign;
    case Skills.SoundEditing:
      return IconNames.SoundEditing;
    case Skills.GameDesign:
      return IconNames.GameDesign;
    default:
      return IconNames.Default;
  }
};
export const getSkillGroupColor = (group: SkillGroups): string => {
  switch (group) {
    case SkillGroups.Filmmaking:
      return "#FF0000"; // Red
    case SkillGroups.VisualArts:
      return "#00FF00"; // Green
    case SkillGroups.Fashion:
      return "#0000FF"; // Blue
    case SkillGroups.Writing:
      return "#FFFF00"; // Yellow
    case SkillGroups.PerformingArts:
      return "#00FFFF"; // Cyan
    case SkillGroups.Music:
      return "#FF00FF"; // Magenta
    default:
      return "#000000"; // Black
  }
};

export const getSkillGroupName = (value: SkillGroupType): string => {
  return SkillGroups[value] || "";
};

export const getSkill = (value: SkillType): string => {
  return Skills[value] || "";
};

export const getRestOfSkills = (skillsDTO: SkillDTO[]): SkillDTO[] => {
  const allSkills = Object.values(Skills).filter(
    (value) => typeof value === "number"
  ) as Skills[];

  const currentSkills = skillsDTO.map((skill) => skill.skillType);

  const restOfSkills = allSkills.filter(
    (skill) => !currentSkills.includes(skill)
  );

  // Map the rest of the skills to SkillDTO objects
  const restOfSkillsDTO = restOfSkills.map(
    (skill) =>
      ({
        description: undefined,
        id: undefined,
        level: undefined,
        skillGroupType: skillGroupMap[skill],
        skillType: skill,
      } as SkillDTO)
  );

  return restOfSkillsDTO;
};

type SkillProps = {
  skill: SkillDTO;
  editMode: boolean;
  deselectSkill?: (skillDTO: SkillDTO) => void;
  selectSkill?: (skillDTO: SkillDTO) => void;
};

const Skill: FC<SkillProps> = ({
  skill,
  editMode,
  deselectSkill,
  selectSkill,
}) => {
  if (
    !skill ||
    skill.skillGroupType === undefined ||
    skill.skillType == undefined
  )
    return null;

  const color = getSkillGroupColor(skill.skillGroupType);
  const icon = getSkillIcon(skill.skillGroupType);
  const name = getSkill(skill.skillType);

  return (
    <TouchableOpacity
      disabled={!selectSkill}
      onPress={() => (selectSkill ? selectSkill(skill) : null)}
    >
      <Shadow
        distance={8}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 25,
            padding: 16,
            margin: 5,
            width: 190,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            position: "relative",
          }}
        >
          <View
            style={{
              backgroundColor: color,
              borderRadius: 90,
              padding: 5,
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name={icon as any}
              size={30}
              color="white"
            />
          </View>
          <Text style={{ color: "black", marginLeft: 10 }}>{name}</Text>
          {editMode && (
            <TouchableOpacity
              style={{
                position: "absolute",
                top: -8,
                right: -8,
                backgroundColor: "red",
                borderRadius: 50,
                padding: 5,
              }}
              onPress={() => (deselectSkill ? deselectSkill(skill) : null)}
            >
              <MaterialCommunityIcons
                name="minus-thick"
                size={15}
                color="white"
              />
            </TouchableOpacity>
          )}
        </View>
      </Shadow>
    </TouchableOpacity>
  );
};

export default Skill;
