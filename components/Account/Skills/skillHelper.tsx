import {
  SkillDTO,
  SkillGroupType,
  SkillType,
  SkillUpdateDTO,
} from "@/common/api/model";

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
  Composing,
}

export const skillGroupMap = {
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
  [Skills.Composing]: SkillGroups.Music,
};

const skillsToStringMapping: { [index: number]: string } = {
  [Skills.Programming]: "Programming",
  [Skills.Management]: "Management",
  [Skills.Acting]: "Acting",
  [Skills.Painting]: "Painting",
  [Skills.Writing]: "Writing",
  [Skills.Singing]: "Singing",
  [Skills.Dancing]: "Dancing",
  [Skills.Drawing]: "Drawing",
  [Skills.Photography]: "Photography",
  [Skills.Directing]: "Directing",
  [Skills.Producing]: "Producing",
  [Skills.Editing]: "Editing",
  [Skills.Cinematography]: "Cinematography",
  [Skills.SoundEngineering]: "Sound Engineering",
  [Skills.SoundDesign]: "Sound Design",
  [Skills.SoundEditing]: "Sound Editing",
  [Skills.GameDesign]: "Game Design",
  [Skills.Composing]: "Composing",
};

export enum IconNames {
  Programming = "music",
  Management = "music",
  Acting = "music",
  Painting = "music",
  Writing = "music",
  Singing = "music",
  Dancing = "music",
  Drawing = "music",
  Photography = "camera",
  Directing = "music",
  Producing = "music",
  Editing = "music",
  Cinematography = "camera",
  SoundEngineering = "volume-high",
  SoundDesign = "record-vinyl",
  SoundEditing = "headphones",
  GameDesign = "music",
  Default = "camera",
  Composing = "music",
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
    case Skills.Composing:
      return IconNames.Composing;
    default:
      return IconNames.Default;
  }
};
export const getSkillGroupColor = (
  group: SkillGroups,
  opacity: number = 1
): string => {
  var colour: string = ""; // Black

  switch (group) {
    case SkillGroups.Filmmaking:
      colour = "#FF0000"; // Red
      break;
    case SkillGroups.VisualArts:
      colour = "#00FF00"; // Green
      break;
    case SkillGroups.Fashion:
      colour = "#0000FF"; // Blue
      break;
    case SkillGroups.Writing:
      colour = "#FFFF00"; // Yellow
      break;
    case SkillGroups.PerformingArts:
      colour = "#FFA500"; // Orange
      break;
    case SkillGroups.Music:
      colour = "#FF00FF"; // Magenta
      break;
    default:
      colour = "#000000"; // Black
  }

  const r = parseInt(colour.slice(1, 3), 16);
  const g = parseInt(colour.slice(3, 5), 16);
  const b = parseInt(colour.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const getSkillGroupName = (value: SkillGroupType): string => {
  return SkillGroups[value] || "";
};

export const getSkill = (value: SkillType | undefined): string => {
  if (value === undefined) {
    return "";
  }
  return skillsToStringMapping[value] || "";
};

export const getRestOfSkills = (skillsDTO: SkillDTO[]): SkillDTO[] => {
  const allSkills = Object.values(Skills).filter(
    (value) => typeof value === "number"
  ) as Skills[];

  const currentSkills = skillsDTO.map((skill) => skill.skillType);

  const restOfSkills = allSkills.filter(
    (skill) => !currentSkills.includes(skill)
  );

  const restOfSkillsDTO = restOfSkills.map(
    (skill) =>
      ({
        description: undefined,
        id: undefined,
        level: undefined,
        skillGroupType: skillGroupMap[skill],
        skillType: skill,
      }) as SkillDTO
  );

  return restOfSkillsDTO;
};

export const mapSkillDTOToSkillUpdateDTO = (
  skillDTO: SkillDTO
): SkillUpdateDTO => {
  return {
    description: skillDTO.description,
    id: skillDTO.id,
    level: skillDTO.level,
    skillGroupType: skillDTO.skillGroupType,
    skillType: skillDTO.skillType,
  };
};
