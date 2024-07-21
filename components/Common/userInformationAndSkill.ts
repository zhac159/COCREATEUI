import { SkillType, UserInformationDTO } from "@/common/api/model";

type UserInformationAndSkill = {
  userInformation: UserInformationDTO;
  skill?: SkillType
};

export default UserInformationAndSkill;
