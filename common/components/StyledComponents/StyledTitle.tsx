import { FC } from "react";
import StyledText, { StyledTextProps } from "./StyledText";
import { StyleSheet } from "react-native";

type StyledTitleProps = StyledTextProps;

export const StyledTitle: FC<StyledTitleProps> = ({
  text,
  style,
  ...props
}) => {
  return (
    <StyledText text={text} secondary style={[styles.text, style]} {...props} />
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 25,
    fontWeight: "400",
  },
});
