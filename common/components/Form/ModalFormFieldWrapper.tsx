import { FC, ReactNode } from "react";
import { StyleSheet } from "react-native";
import { Theme } from "@react-navigation/native";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import {
  ScrollViewWrapper,
  ScrollViewWrapperProps,
} from "../ScrollViewWrapper";

type ModalFormFieldWrapperProps = ScrollViewWrapperProps & {
  children: ReactNode;
};

export const ModalFormFieldWrapper: FC<ModalFormFieldWrapperProps> = ({
  children,
  ...props
}) => {
  const styles = useThemedStyles(getStyles);
  return <ScrollViewWrapper {...props}>{children}</ScrollViewWrapper>;
};

const getStyles = (theme: Theme) => StyleSheet.create({});
