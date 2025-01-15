import { ProjectCreateDTO } from "@/api/model";
import { JsStack } from "@/common/contexts/JsStackContext";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import { useGetNewProjectDefaultValues } from "@/components/Main/Forms/NewProject/hooks/useGetNewProjectDefaultValues";
import { Theme } from "@react-navigation/native";
import { TransitionPresets } from "@react-navigation/stack";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";

export default function NewProjectLayout() {
  const { defaultProject } = useGetNewProjectDefaultValues();

  const form = useForm<ProjectCreateDTO>({
    defaultValues: defaultProject,
  });

  const styles = useThemedStyles(getStyles);

  return (
    <FormProvider {...form}>
      <JsStack
        screenOptions={{
          headerShown: false,
          cardStyle: styles.cardStyle,
        }}
      >
        <JsStack.Screen name="index" />
        <JsStack.Screen
          name="location"
          options={{
            ...TransitionPresets.ModalPresentationIOS,
            presentation: "modal",
            gestureEnabled: true,
          }}
        />
        <JsStack.Screen
          name="date"
          options={{
            ...TransitionPresets.ModalPresentationIOS,
            presentation: "modal",
            gestureEnabled: true,
          }}
        />
        <JsStack.Screen
          name="payment"
          options={{
            ...TransitionPresets.ModalPresentationIOS,
            presentation: "modal",
            gestureEnabled: true,
          }}
        />
        <JsStack.Screen
          name="skill"
          options={{
            ...TransitionPresets.ModalPresentationIOS,
            presentation: "modal",
            gestureEnabled: false,
          }}
        />
      </JsStack>
    </FormProvider>
  );
}

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    cardStyle: {
      backgroundColor: theme.colors.backgroundColor,
    },
  });
