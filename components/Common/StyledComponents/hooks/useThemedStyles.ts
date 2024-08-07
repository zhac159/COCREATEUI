import { useTheme } from '@/components/Themes/theme';
import CustomTheme from '@/components/Themes/themeType';
import { StyleSheet } from 'react-native';

const useThemedStyles = <T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>>(
  getStyles: (theme: CustomTheme) => T
): T => {
  const theme = useTheme();
  return getStyles(theme);
};

export default useThemedStyles;