import ProjectCreate from "@/components/Project/ProjectCreate/ProjectCreate";
import { View } from "react-native";

export default function CreateProject() {
  return (
    <View
      style={{
        flex: 1,
        paddingTop: "5%",
        paddingBottom: "7%",
      }}
    >
      <ProjectCreate />
    </View>
  );
}
