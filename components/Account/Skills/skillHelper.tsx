import { SkillDTO, SkillGroupType, SkillType } from "@/common/api/model";

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
      } as SkillDTO)
  );

  return restOfSkillsDTO;
};
