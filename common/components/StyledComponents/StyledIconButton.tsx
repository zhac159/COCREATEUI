import useThemedStyles from "@/common/theme/getThemedStylesheet";
import { FontAwesome6 } from "@expo/vector-icons";
import { Theme } from "@react-navigation/native";
import { FC } from "react";
import {
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
} from "react-native";

type StyledIconButtonProps = TouchableOpacityProps & {
  iconName: string;
  iconSize?: number;
  iconStyle?: TextStyle;
};

export const StyledIconButton: FC<StyledIconButtonProps> = ({
  iconStyle,
  iconName,
  style,
  ...props
}) => {
  const styles = useThemedStyles(getStyles);
  return (
    <TouchableOpacity style={[styles.container, style]} {...props}>
      <FontAwesome6
        name={iconName}
        size={16}
        style={[iconStyle, styles.icon]}
      />
    </TouchableOpacity>
  );
};

export default StyledIconButton;

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.iconGray,
      borderRadius: 50,
      padding: 13,
    },
    icon: {
      color: theme.colors.white,
    },
  });
