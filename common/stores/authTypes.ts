import { UserLoginResponseDTO } from "@/api/model";

export type AuthState = {
  auth: UserLoginResponseDTO;
};

export const defaultAuth: UserLoginResponseDTO = {
  bannerPictureSrc: "",
  email: "",
  userId: 0,
  username: "",
  coins: 0,
  projectsManaging: [],
};