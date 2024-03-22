import { DefaultTheme } from "react-native-paper";

type Theme = typeof DefaultTheme;
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

interface CustomTheme extends Theme {
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
}

export default CustomTheme;
