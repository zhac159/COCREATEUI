import { useGetApiProjectCompleted } from "@/common/api/endpoints/cocreateApi";
import GoBackButton from "@/components/Common/goBackButton";
import CompletedProjectViewer from "@/components/CompleteProject/CompletedProjectViewer";
import { useLocalSearchParams } from "expo-router";
import { View, StyleSheet } from "react-native";

export default function CompletedProject() {
  const { projectId } = useLocalSearchParams<{
    projectId: string;
  }>();

  const intId = parseInt(projectId as string, 10);

  const { data: completedProject } = useGetApiProjectCompleted({
    projectId: intId,
  });

  if (!completedProject)
    return (
      <View
        style={{
          flex: 1,
        }}
      ></View>
    );

  return (
    <View style={styles.container}>
      <GoBackButton />
      <CompletedProjectViewer completedProject={completedProject} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
