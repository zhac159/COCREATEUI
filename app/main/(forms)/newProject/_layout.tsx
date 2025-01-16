import { ProjectUpdateDTO } from "@/api/model";
import { JsStack } from "@/common/contexts/JsStackContext";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import { useGetNewProjectDefaultValues } from "@/components/Main/Forms/NewProject/hooks/useGetNewProjectDefaultValues";
import { Theme } from "@react-navigation/native";
import { TransitionPresets } from "@react-navigation/stack";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetCreateProjectFormSchema } from "@/components/Main/Forms/NewProject/hooks/useGetCreateProjectFormSchema";
import { useLocalSearchParams } from "expo-router";
import { useGetApiProjectProjectId } from "@/api/endpoints/cocreateApi";
import { useEffect, useMemo } from "react";

type NewProjectParams = {
  projectId: string;
};

export default function NewProjectLayout() {
  const styles = useThemedStyles(getStyles);

  const params = useLocalSearchParams<NewProjectParams>();
  const projectId = parseInt(params.projectId, 10);

  const { data, isFetching } = useGetApiProjectProjectId(projectId);
  const { defaultProject } = useGetNewProjectDefaultValues();

  const { createProjectFormSchema } = useGetCreateProjectFormSchema();

  const form = useForm<ProjectUpdateDTO>({
    defaultValues: defaultProject,
    resolver: zodResolver(createProjectFormSchema),
  });

  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data]);

  if (isFetching) {
    return null;
  }

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
