import { DefaultTheme } from "@react-navigation/native";
import { CustomTheme } from "./themeTypes";

export const LightTheme: CustomTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "rgb(35, 68, 255)",
      black: "rgb(0, 0, 0)",
      lightBlack: "rgb(23, 23, 23)",
      orange: "rgb(218, 165, 32)",
      darkOrange: "rgb(255,87,0)",
      white: "rgb(255, 255, 255)",
      darkestGray: "rgb(25, 25, 25)",
      darkerGray: "rgb(58, 58, 58)",
      darkGray: "rgb(114, 114, 114)",
      gray: "rgb(128, 128, 128)",
      grayer: "rgb(174, 174, 174)",
      iconGray: "rgb(151, 151, 151)",
      lightGray: "rgb(220, 220, 220)",
      lightestGray: "rgb(244, 244, 244)",
      green: "rgb(56, 250, 152)",
      red: "rgb(251, 0, 0)",
      lightBlue: "rgb(223, 228, 255)",
      tabBarDarkColor: "rgba(55, 55, 55, 0.8)",
      tabBarLightColor: "rgba(202, 198, 198, 0.8)",
      backgroundColor: "rgb(214, 211, 211)",
      backgroundColorContrast: "rgb(255, 255, 255)",
    },
    customFonts: {  
      primary: {  
        small: {
          fontFamily: "Helvetica Neue",
          fontWeight: "500",
          fontSize: 15,
        },
        medium: {
          fontFamily: "Helvetica Neue",
          fontWeight: "700",
          fontSize: 17,
        },
        large: {
          fontFamily: "Helvetica Neue",
          fontWeight: "900",
          fontSize: 45,
        }
      },
      secondary: {
        small: {
          fontFamily: "LibreCaslonText",
          fontWeight: "500",
          fontSize: 15,
        },
        medium: {
          fontFamily: "LibreCaslonText",
          fontWeight: "700",
          fontSize: 17,
        },
        large: {
          fontFamily: "LibreCaslonText",
          fontWeight: "900",
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