
import { Theme, useTheme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

const useThemedStyles = <T extends StyleSheet.NamedStyles<any>>(
  getStyles: (theme: Theme) => T
): T => {
  const theme = useTheme();
  return getStyles(theme);
};

export default useThemedStyles;