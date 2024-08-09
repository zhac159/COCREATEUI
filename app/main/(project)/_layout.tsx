import React from "react";
import { JsStack } from "@/components/Common/JStack";
import { CardStyleInterpolators } from "@react-navigation/stack";

export default function ProjectsLayout() {
  return (
    <JsStack screenOptions={{ headerShown: false }}>
      <JsStack.Screen
        name="projectRoleFormPage"
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
    </JsStack>
  );
}
