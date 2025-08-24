import { UserLoginResponseDTO } from "@/api/model";

export type AuthState = {
  auth: UserLoginResponseDTO;
};

export const defaultAuth: UserLoginResponseDTO = {
  profilePicture: "",
  email: "",
  userId: 0,
  username: "",
  coins: 0,
  projectsManaging: [],
  chats: [],
  publicKey: "",
};