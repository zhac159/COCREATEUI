import { Theme } from "@react-navigation/native";
import { CustomTheme } from "../common/theme/themeTypes";

declare module '@react-navigation/native' {
  export interface Theme extends CustomTheme {}
  export function useTheme(): Theme;
}