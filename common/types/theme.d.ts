import { Theme } from "@react-navigation/native";
import { CustomTheme } from "../theme/themeTypes";

declare module '@react-navigation/native' {
  export interface Theme extends CustomTheme {}
  export function useTheme(): Theme;
}