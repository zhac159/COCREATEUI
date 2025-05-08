import { FC, ReactNode, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";

type StepFormProps = {
  formPages: ReactNode[];
};

// using React.FC to define the component

const StepForm: FC<StepFormProps> = ({ formPages }) => {
  const [index, setIndex] = useState(formPages.length - 1);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {formPages[index]}
    </ScrollView>
  );
};
