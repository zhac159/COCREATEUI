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
      coins: {
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
    orange: string;
    white: string;
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
