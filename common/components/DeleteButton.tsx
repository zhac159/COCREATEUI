import { FC } from "react";
import { StyleSheet } from "react-native";
import { Theme } from "@react-navigation/native";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import StyledIconButton, {
  StyledIconButtonProps,
} from "./StyledComponents/StyledIconButton";

type DeleteButtonProps = Omit<StyledIconButtonProps, "iconName"> & {};

export const DeleteButton: FC<DeleteButtonProps> = ({ style, ...props }) => {
  const styles = useThemedStyles(getStyles);
  return (
    <StyledIconButton
      iconStyle={styles.icon}
      style={[styles.container, style]}
      {...props}
      iconName={"minus"}
    />
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    icon: {
      color: theme.colors.white,
    },
    container: {
      backgroundColor: theme.colors.red,
      height: 40,
      width: 40,
      elevation: 10,
    },
  });
