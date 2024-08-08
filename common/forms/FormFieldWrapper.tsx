import StyledText from "@/components/Common/StyledComponents/StyledText";
import { FC, ReactNode } from "react";

type FormFieldWrapperProps = {
  children?: ReactNode;
  error?: string;
};

const FormFieldWrapper: FC<FormFieldWrapperProps> = ({ children, error }) => {
  return (
    <>
      <StyledText content={error} error />
      {children}
    </>
  );
};

export default FormFieldWrapper;
