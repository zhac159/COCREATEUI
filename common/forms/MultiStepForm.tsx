import StyledButton from "@/components/Common/StyledButton";
import useThemedStyles from "@/components/Common/StyledComponents/hooks/useThemedStyles";
import StyledText from "@/components/Common/StyledComponents/StyledText";
import CustomTheme from "@/components/Themes/themeType";
import { cloneElement, FC, ReactElement, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MultiStepFormIndicator } from "./MultiStepFormIndicator";

export type FormPageProps = {
  nextStep?: () => void;
  hasError?: boolean;
  title: string;
};

export type MultiStepFormProps = {
  children: ReactElement<FormPageProps>[];
  onSubmit?: () => void;
  onCancel?: () => void;
};

export const MultiStepForm: FC<MultiStepFormProps> = ({
  children,
  onSubmit,
  onCancel,
}) => {
  const styles = useThemedStyles(getStyles);

  const [index, setIndex] = useState(0);

  const nextStep = () => {
    index === children.length - 1
      ? onSubmit?.()
      : setIndex((currentIndex) => currentIndex + 1);
  };

  const stepsWithErrorsIndexes = useMemo(() => {
    return children
      .map((child, index) => (child.props.hasError ? index : -1))
      .filter((index) => index !== -1);
  }, [children]);

  const formsWithNextStep = useMemo(
    () => children.map((form) => cloneElement(form, { nextStep })),
    [children, nextStep]
  );

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.container}
    >
      <View style={styles.headerContainer}>
        <MultiStepFormIndicator
          stepsWithErrorsIndexes={stepsWithErrorsIndexes}
          steps={children.length}
          currentStep={index}
          onStepPress={setIndex}
        />
        {onCancel && (
          <StyledButton
            text="Cancel"
            onPress={onCancel}
            style={styles.cancelButton}
          />
        )}
      </View>
      <StyledText
        content={formsWithNextStep[index].props.title}
        secondary
        fontSize={35}
        style={styles.title}
      />
      {formsWithNextStep[index]}
    </KeyboardAwareScrollView>
  );
};

const getStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    container: {
      paddingVertical: "15%",
      paddingHorizontal: "3%",
      gap: 40,
    },
    title: {
      marginBottom: "0%",
    },
    cancelButton: {
      backgroundColor: theme.colors.black,
    },
    headerContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
      gap: 20,
      width: "100%",
      alignContent: "center",
      alignItems: "center",
    },
  });
