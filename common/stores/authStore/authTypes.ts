import { AuthenticatedUser } from "@/api2/model";

export type AuthState = {
  auth: AuthenticatedUser;
};

export const defaultAuth: AuthenticatedUser = {
  email: "",
  userId: 0,
  username: "",
  coins: 0,
};
