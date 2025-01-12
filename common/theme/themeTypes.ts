import { DefaultTheme } from "@react-navigation/native";

type FontWeight =
  | "700"
  | "500"
  | "900"
  | "800"
  | "600"
  | "400"
  | "300"
  | "200"
  | "100"
  | "normal"
  | "bold";

type Theme = typeof DefaultTheme;

export type CustomTheme = Theme & {
  customFonts: {
    primary: {
      small: {
        fontFamily: string;
        fontWeight: FontWeight;
        fontSize: number;
      };
      medium: {
        fontFamily: string;
        fontWeight: FontWeight;
        fontSize: number;
      };
      large: {
        fontFamily: string;
        fontWeight: FontWeight;
        fontSize: number;
      };
    };
    secondary: {
      small: {
        fontFamily: string;
        fontWeight: FontWeight;
        fontSize: number;
      };
      medium: {
        fontFamily: string;
        fontWeight: FontWeight;
        fontSize: number;
      };
      large: {
        fontFamily: string;
        fontWeight: FontWeight;
        fontSize: number;
      };
    };
  };
  colors: Theme["colors"] & {
    black: string;
    lightBlack: string;
    orange: string;
    darkOrange: string;
    white: string;
    darkestGray: string;
    darkerGray: string;
    darkGray: string;
    gray: string;
    iconGray: string;
    grayer: string;
    lightGray: string;
    lightestGray: string;
    green: string;
    red: string;
    lightBlue: string;
    tabBarDarkColor: string;
    tabBarLightColor: string;
    backgroundColor: string;
  };
  customIcons: {
    small: {
      size: number;
      color: string;
    };
    medium: {
      size: number;
      color: string;
      weight: string;
    };
    large: {
      size: number;
      color: string;
    };
  };
};
