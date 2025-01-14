import { ProjectCreateDTO } from "@/api/model";
import { useFormContext } from "react-hook-form";
import { View, Text } from "react-native";

export default function Cost() {
  const form = useFormContext<ProjectCreateDTO>();

  return (
    <View
      style={{
        backgroundColor: "transparent",
      }}
    >
      <Text>Test</Text>
    </View>
  );
}
