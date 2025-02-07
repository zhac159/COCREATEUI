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

export type StyledIconButtonProps = TouchableOpacityProps & {
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
    <TouchableOpacity
      style={[styles.container, style]}
      {...props}
    >
      <FontAwesome6
        name={iconName}
        size={17}
        style={[styles.icon, iconStyle]}
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
      aspectRatio: 1,
      minHeight: 40,
      minWidth: 40,
      alignItems: "center",
      justifyContent: "center",
    },
    icon: {
      fontSize: 17,
      color: theme.colors.white,
    },
  });
