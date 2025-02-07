import { useGetApiUserProfileDetails } from "@/api/endpoints/cocreateApi";
import { UserUpdateDTO } from "@/api/model";
import { JsStack } from "@/common/contexts/JsStackContext";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import { Theme } from "@react-navigation/native";
import { TransitionPresets } from "@react-navigation/stack";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";

export default function NewProjectLayout() {
  const styles = useThemedStyles(getStyles);

  const { data, isFetching, isLoading, isSuccess } = useGetApiUserProfileDetails();

  const form = useForm<UserUpdateDTO>();

  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data]);

  if(isFetching || isLoading || !isSuccess) {
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
        <JsStack.Screen name="skills" />
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
