import ProjectCreate from "@/components/Project/ProjectCreate/ProjectCreate";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function CreateProject() {
  return (
    <ScrollView
      style={{
        flex: 1,
      }}
      showsVerticalScrollIndicator={false}
    >
      <ProjectCreate />
    </ScrollView>
  );
}
