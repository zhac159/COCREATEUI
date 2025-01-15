import { FC } from "react";
import { StyleSheet } from "react-native";
import { Theme } from "@react-navigation/native";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import StyledButton, {
  StyledButtonProps,
} from "./StyledComponents/StyledButton";

type AddButtonProps = Omit<StyledButtonProps, "icon"> & {
  icon?: string;
};

export const AddButton: FC<AddButtonProps> = ({ icon = "plus", ...props }) => {
  const styles = useThemedStyles(getStyles);
  return <StyledButton style={styles.button} icon="plus" {...props} />;
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    button: {
      borderRadius: 10,
      elevation: 8,
    },
  });
