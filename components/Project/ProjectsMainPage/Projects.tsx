import React, { FC, useEffect, useState } from "react";
import { View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { windowWidth } from "@/components/Account/Common/getWindowDimensions";
import { useProjectValue } from "@/components/RecoilStates/profileState";
import ProjectBanner from "./ProjectBanner/ProjectBanner";
import { SelectedRole, bannerHeight } from "./projectMainPageHelper";
import ProjectManage from "./ProjectManage";

type ProjectsProps = {};

const Projects: FC<ProjectsProps> = () => {
  const projects = useProjectValue();

  const [currentIndex, setCurrentIndex] = useState(0);

  const [selectedRole, setSelectedRole] = useState<SelectedRole>({
    allRoles: true,
  });

  const uris = projects
    ? projects?.map((project) => project.medias[0].uri)
    : [];

  useEffect(() => {
    setSelectedRole({
      allRoles: true,
    });
  }, [currentIndex, projects]);

  const renderItem = ({
    item,
    index,
  }: {
    item: string | null | undefined;
    index: number;
  }) => {
    const project = projects?.[index];
    return (
      <ProjectBanner
        id={project.id}
        name={project.name}
        uri={uris[index]}
        roles={project.projectRoles}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
      />
    );
  };

  if (projects.length === 0) return <View></View>;

  return (
    <View>
      <Carousel
        onScrollEnd={(index) => setCurrentIndex(index)}
        width={windowWidth}
        vertical={false}
        loop={false}
        data={uris}
        renderItem={renderItem}
        height={bannerHeight}
      />
      <ProjectManage
        project={projects[currentIndex]}
        selectedRole={selectedRole}
      />
    </View>
  );
};

export default Projects;
