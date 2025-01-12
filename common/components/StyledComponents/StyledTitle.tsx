import { FC } from "react";
import StyledText, { StyledTextProps } from "./StyledText";

type StyledTitleProps = StyledTextProps;

export const StyledTitle: FC<StyledTitleProps> = ({ text, style, ...props }) => {
  return (
    <StyledText
      text={text}
      fontSize={25}
      secondary
      weight="400"
      {...props}
    />
  );
};
