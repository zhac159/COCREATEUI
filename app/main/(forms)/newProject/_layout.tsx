import { ProjectCreateDTO } from "@/api/model";
import { JsStack } from "@/common/contexts/JsStackContext";
import { TransitionPresets } from "@react-navigation/stack";
import { FormProvider, useForm } from "react-hook-form";

export default function NewProjectLayout() {
  const form = useForm<ProjectCreateDTO>();

  // const refinedSchema = postApiProjectBody
  // .extend({})
  // .refine((data) => data.address.length === 0, {
  //   message: "Passwords do not match",
  //   path: ["password"],
  // });

  return (
    <FormProvider {...form}>
      <JsStack
        screenOptions={{
          headerShown: false,
        }}
      >
        <JsStack.Screen name="index" />
        <JsStack.Screen
          name="cost"
          options={{
            ...TransitionPresets.ModalPresentationIOS,
            presentation: "modal",
            gestureEnabled: true,
          }}
        />
        <JsStack.Screen
          name="location"
          options={{
            ...TransitionPresets.ModalPresentationIOS,
            presentation: "modal",
            gestureEnabled: true,
          }}
        />
      </JsStack>
    </FormProvider>
  );
}
