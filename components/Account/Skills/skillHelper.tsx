import {
  SkillDTO,
  SkillGroupType,
  SkillType,
  SkillUpdateDTO,
} from "@/common/api/model";

export enum SkillGroups {
  Filmmaking,
  Acting,
}

export enum Skills {
  Editor,
  Director,
  Producer,
  Screenwriter,
  Cinematographer,
  SoundDesigner,
  ProductionDesigner,
  SpecialEffects,
  ScriptSupervisor,
  CastingDirector,
  MakeupArtist,
  CostumeDesigner,
  BoomOperator,
  PropsManager,
  SoundMixer,
  Runner,
  ProductionAssistant,
  Chreographer,
  AssistantDirector,
  CoProducer,
  HairStylist,
  Grip,
  LocationManager,
  SetDresser,
  StoryBoardArtist,
  Animator,
  LeadActorScreen,
  LeasAcressScreen,
  Extra,
  SupportingActorScreen,
  SupportingActressScreen,
  BackgroundActorActress,
  VoiceActorActress,
  StandIn,
  Dancer,
  LeadActorTheatre,
  LeadActressTheatre,
  MusicalTheatrePerformer,
  SupportingActorTheatre,
  SupportingActressTheatre,
  ActorModel,
}

export const skillGroupMap = {
  [Skills.Editor]: SkillGroups.Filmmaking,
  [Skills.Director]: SkillGroups.Filmmaking,
  [Skills.Producer]: SkillGroups.Filmmaking,
  [Skills.Screenwriter]: SkillGroups.Filmmaking,
  [Skills.Cinematographer]: SkillGroups.Filmmaking,
  [Skills.SoundDesigner]: SkillGroups.Filmmaking,
  [Skills.ProductionDesigner]: SkillGroups.Filmmaking,
  [Skills.SpecialEffects]: SkillGroups.Filmmaking,
  [Skills.ScriptSupervisor]: SkillGroups.Filmmaking,
  [Skills.CastingDirector]: SkillGroups.Filmmaking,
  [Skills.MakeupArtist]: SkillGroups.Filmmaking,
  [Skills.CostumeDesigner]: SkillGroups.Filmmaking,
  [Skills.BoomOperator]: SkillGroups.Filmmaking,
  [Skills.PropsManager]: SkillGroups.Filmmaking,
  [Skills.SoundMixer]: SkillGroups.Filmmaking,
  [Skills.Runner]: SkillGroups.Filmmaking,
  [Skills.ProductionAssistant]: SkillGroups.Filmmaking,
  [Skills.Chreographer]: SkillGroups.Filmmaking,
  [Skills.AssistantDirector]: SkillGroups.Filmmaking,
  [Skills.CoProducer]: SkillGroups.Filmmaking,
  [Skills.HairStylist]: SkillGroups.Filmmaking,
  [Skills.Grip]: SkillGroups.Filmmaking,
  [Skills.LocationManager]: SkillGroups.Filmmaking,
  [Skills.SetDresser]: SkillGroups.Filmmaking,
  [Skills.StoryBoardArtist]: SkillGroups.Filmmaking,
  [Skills.Animator]: SkillGroups.Filmmaking,
  [Skills.LeadActorScreen]: SkillGroups.Acting,
  [Skills.LeasAcressScreen]: SkillGroups.Acting,
  [Skills.Extra]: SkillGroups.Acting,
  [Skills.SupportingActorScreen]: SkillGroups.Acting,
  [Skills.SupportingActressScreen]: SkillGroups.Acting,
  [Skills.BackgroundActorActress]: SkillGroups.Acting,
  [Skills.VoiceActorActress]: SkillGroups.Acting,
  [Skills.StandIn]: SkillGroups.Acting,
  [Skills.Dancer]: SkillGroups.Acting,
  [Skills.LeadActorTheatre]: SkillGroups.Acting,
  [Skills.LeadActressTheatre]: SkillGroups.Acting,
  [Skills.MusicalTheatrePerformer]: SkillGroups.Acting,
  [Skills.SupportingActorTheatre]: SkillGroups.Acting,
  [Skills.SupportingActressTheatre]: SkillGroups.Acting,
  [Skills.ActorModel]: SkillGroups.Acting,
};

const skillsToStringMapping: { [index: number]: string } = {
  [Skills.Editor]: "Editor",
  [Skills.Director]: "Director",
  [Skills.Producer]: "Producer",
  [Skills.Screenwriter]: "Screenwriter",
  [Skills.Cinematographer]: "Cinematographer",
  [Skills.SoundDesigner]: "Sound Designer",
  [Skills.ProductionDesigner]: "Production Designer",
  [Skills.SpecialEffects]: "Special Effects",
  [Skills.ScriptSupervisor]: "Script Supervisor",
  [Skills.CastingDirector]: "Casting Director",
  [Skills.MakeupArtist]: "Makeup Artist",
  [Skills.CostumeDesigner]: "Costume Designer",
  [Skills.BoomOperator]: "Boom Operator",
  [Skills.PropsManager]: "Peops Manager",
  [Skills.SoundMixer]: "Sound Mixer",
  [Skills.Runner]: "Runner",
  [Skills.ProductionAssistant]: "Production Assistant",
  [Skills.Chreographer]: "Chreographer",
  [Skills.AssistantDirector]: "Assistant Director",
  [Skills.CoProducer]: "Co-Producer",
  [Skills.HairStylist]: "Hair Stylist",
  [Skills.Grip]: "Grip",
  [Skills.LocationManager]: "Location Manager",
  [Skills.SetDresser]: "Set Dresser",
  [Skills.StoryBoardArtist]: "Story Board Artist",
  [Skills.Animator]: "Animator",
  [Skills.LeadActorScreen]: "Lead Actor (Screen)",
  [Skills.LeasAcressScreen]: "Lead Actress (Screen)",
  [Skills.Extra]: "Extra",
  [Skills.SupportingActorScreen]: "Supporting Actor (Screen)",
  [Skills.SupportingActressScreen]: "Supporting Actress (Screen)",
  [Skills.BackgroundActorActress]: "Background Actor/Actress",
  [Skills.VoiceActorActress]: "Voice Actor/Actress",
  [Skills.StandIn]: "Stand-In",
  [Skills.Dancer]: "Dancer",
  [Skills.LeadActorTheatre]: "Lead Actor (Theatre)",
  [Skills.LeadActressTheatre]: "Lead Actress (Theatre)",
  [Skills.MusicalTheatrePerformer]: "Musical Theatre Performer",
  [Skills.SupportingActorTheatre]: "Supporting Actor (Theatre)",
  [Skills.SupportingActressTheatre]: "Supporting Actress (Theatre)",
  [Skills.ActorModel]: "Actor/Model",
};

export const getSkillIcon = (skill: Skills): string => {
  switch (skill) {
    case Skills.Editor:
      return "scissors";
    case Skills.Director:
      return "bullhorn";
    case Skills.Producer:
      return "list-check";
    case Skills.Screenwriter:
      return "quote-right";
    case Skills.Cinematographer:
      return "video";
    case Skills.SoundDesigner:
      return "file-audio";
    case Skills.ProductionDesigner:
      return "pencil";
    case Skills.SpecialEffects:
      return "burst";
    case Skills.ScriptSupervisor:
      return "book";
    case Skills.CastingDirector:
      return "person-chalkboard";
    case Skills.MakeupArtist:
      return "paintbrush";
    case Skills.CostumeDesigner:
      return "shirt";
    case Skills.BoomOperator:
      return "microphone-lines";
    case Skills.PropsManager:
      return "glasses";
    case Skills.SoundMixer:
      return "sliders";
    case Skills.Runner:
      return "handshake-angle";
    case Skills.ProductionAssistant:
      return "clipboard-list";
    case Skills.Chreographer:
      return "arrow-right-arrow-left";
    case Skills.AssistantDirector:
      return "bullhorn";
    case Skills.CoProducer:
      return "list-check";
    case Skills.HairStylist:
      return "person-rays";
    case Skills.Grip:
      return "camera-rotate";
    case Skills.LocationManager:
      return "location-dot";
    case Skills.SetDresser:
      return "house";
    case Skills.StoryBoardArtist:
      return "users-viewfinder";
    case Skills.Animator:
      return "palette";
    case Skills.LeadActorScreen:
      return "person-rays";
    case Skills.LeasAcressScreen:
      return "person-rays";
    case Skills.Extra:
      return "people-group";
    case Skills.SupportingActorScreen:
      return "person";
    case Skills.SupportingActressScreen:
      return "person";
    case Skills.BackgroundActorActress:
      return "person-half-dress";
    case Skills.VoiceActorActress:
      return "microphone-lines";
    case Skills.StandIn:
      return "person-circle-plus";
    case Skills.Dancer:
      return "person-walking";
    case Skills.LeadActorTheatre:
      return "person-rays";
    case Skills.LeadActressTheatre:
      return "person-rays";
    case Skills.MusicalTheatrePerformer:
      return "guitar";
    case Skills.SupportingActorTheatre:
      return "person";
    case Skills.SupportingActressTheatre:
      return "person";
    case Skills.ActorModel:
      return "star";
    default:
      return "users";
  }
};

export const getSkillGroupColor = (
  group: SkillGroups,
  opacity: number = 1
): string => {
  var colour: string = "";

  switch (group) {
    case SkillGroups.Filmmaking:
      colour = "#2344FF";
      break;
    case SkillGroups.Acting:
      colour = "#00B4D8";
      break;
    default:
      colour = "#2344FF";
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
    keywords: skillDTO.keywords ?? [],
  };
};
