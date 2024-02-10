import { DefaultTheme, useTheme as usePaperTheme  } from 'react-native-paper';
import CustomTheme from './themeType';

export const LightTheme: CustomTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "rgb(35, 68, 255)",
    black: "rgb(0, 0, 0)",
    orange: "rgb(255, 87, 0)",
    white: "rgb(255, 255, 255)",
  },
  customFonts: {
    primary: {
      small: {
        fontFamily: "Helvetica Neue",
        fontWeight: "300",
        fontSize: 15,
      },
      medium: {
        fontFamily: "Helvetica Neue",
        fontWeight: "500",
        fontSize: 17,
      },
      large: {
        fontFamily: "Helvetica Neue",
        fontWeight: "700",
        fontSize: 45,
      },
      coins : {
        fontFamily: "Helvetica Neue",
        fontWeight: "900",
        fontSize: 30,
      }
    },
    secondary: {
      small: {
        fontFamily: "Libre Caslon Text",
        fontWeight: "500",
        fontSize: 15,
      },
      medium: {
        fontFamily: "Libre Caslon Text",
        fontWeight: "500",
        fontSize: 17,
      },
      large: {
        fontFamily: "Libre Caslon Text",
        fontWeight: "400",
        fontSize: 45,
      },
    },
  },
  customIcons: {
    small: {
      size: 20,
      color: "black",
    },
    medium: {
      size: 17,
      color: "rgb(255, 255, 255)",
      weight: "900",
    },
    large: {
      size: 40,
      color: "black",
    },
  },
};



export function useTheme(): CustomTheme {
  return usePaperTheme() as CustomTheme;
}