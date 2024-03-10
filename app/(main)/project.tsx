import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { useProjectValue } from "@/components/RecoilStates/profileState";
import ProjectCreate from "@/components/Project/ProjectCreate";
import ProjectAddRoles from "@/components/Project/ProjectAddRoles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";
import { Carousel } from "react-native-snap-carousel";
import { windowWidth } from "@/components/Account/Common/getWindowDimensions";
import ProjectBanner from "@/components/Project/ProjectBanner";

export default function Project() {
  const projects = useProjectValue();

  const uris = projects
    ? projects?.map((project) => (project.medias ? project.medias[0].uri : ""))
    : [];

  const [selectedProject, setSelectedProject] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [createMode, setCreateMode] = useState(false);

  const renderItem = ({
    item,
    index,
  }: {
    item: string | null | undefined;
    index: number;
  }) => {
    return (
      <ProjectBanner
        name={projects ? projects[index]?.name : "N/A"}
        setEditMode={() => {
          setEditMode(true), setSelectedProject(index);
        }}
        setCreateMode={() => {
          setCreateMode(true), setSelectedProject(index);
        }}
        uri={uris[index]}
      />
    );
  };

  if (projects?.length === 0 || createMode) {
    return <ProjectCreate onCancel={() => setCreateMode(false)} />;
  }

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
      pointerEvents="box-none"
      keyboardShouldPersistTaps="handled"
    >
      {editMode ? (
        <ProjectAddRoles
          projectIndex={selectedProject}
          onCancel={() => setEditMode(false)}
        />
      ) : (
        <Carousel
          vertical={false}
          data={uris}
          renderItem={renderItem}
          sliderWidth={windowWidth}
          itemWidth={windowWidth}
          onScrollIndexChanged={(index) => setSelectedProject(index)}
          inactiveSlideShift={-20}
         />
      )}
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    flex: 1,
    padding: 0,
  },
  imageContainer: {
    height: 400,
    width: "100%",
  },
});
