import { FC, ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { Theme } from "@react-navigation/native";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import {
  ScrollViewWrapper,
  ScrollViewWrapperProps,
} from "../ScrollViewWrapper";
import StyledText from "../StyledComponents/StyledText";
import { StyledTitle } from "../StyledComponents/StyledTitle";
import { GoBackButton } from "../GoBackButton";

type ModalFormFieldWrapperProps = ScrollViewWrapperProps & {
  children: ReactNode;
  title: string;
  description: string;
};

export const ModalFormFieldWrapper: FC<ModalFormFieldWrapperProps> = ({
  children,
  title,
  description,
  ...props
}) => {
  const styles = useThemedStyles(getStyles);
  return (
    <ScrollViewWrapper disableTopInset style={styles.container} {...props}>
      <View style={styles.header}>
        <GoBackButton />
        <StyledTitle text={title} />
      </View>
      <StyledText text={description} style={styles.description} />
      {children}
    </ScrollViewWrapper>
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.white,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      gap: 20,
    },
    description: {
      marginVertical: 36,
      color: theme.colors.grayer,
      paddingHorizontal: "5%",
    },
  });
