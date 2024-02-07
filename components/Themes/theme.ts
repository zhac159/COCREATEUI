import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

export const LightTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: 'blue',
    accent: 'yellow',
  },
};

export const DarkTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: 'blue',
    accent: 'yellow',
  },
};