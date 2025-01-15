import { FC } from "react";
import { StyleSheet } from "react-native";
import { Theme } from "@react-navigation/native";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import StyledIconButton, {
  StyledIconButtonProps,
} from "./StyledComponents/StyledIconButton";

type GoBackButtonProps = Omit<StyledIconButtonProps, "iconName"> & {};

export const GoBackButton: FC<GoBackButtonProps> = ({ ...props }) => {
  const styles = useThemedStyles(getStyles);
  return (
    <StyledIconButton
      iconStyle={styles.icon}
      style={styles.container}
      {...props}
      iconName={"chevron-left"}
    />
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    icon: {
      color: theme.colors.black,
    },
    container: {
      backgroundColor: theme.colors.backgroundColor,
      height: 40,
      width: 40,
    },
  });
