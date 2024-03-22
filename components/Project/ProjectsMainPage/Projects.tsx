import { ProjectRoleDTO } from "@/common/api/model";
import {
  Dispatch,
  FC,
  SetStateAction,
  useState,
} from "react";
import {
  View,
  Text,
} from "react-native";
import { Carousel } from "react-native-snap-carousel";
import { windowWidth } from "@/components/Account/Common/getWindowDimensions";
import EnquiryChatPreview from "@/components/Chats/EnquiryChatPreview";
import { useTheme } from "@/components/Themes/theme";
import { EnquiryDTO } from "@/common/api/model";
import { useProjectValue } from "@/components/RecoilStates/profileState";
import ProjectBanner from "./ProjectBanner";
import ViewApplicationsButton from "./ViewApplicationsButton";
import ProjectRoleSelection from "./ProjectRoleSelection";

type ProjectsProps = {
  selectedProject: number;
  setSelectedProject: Dispatch<SetStateAction<number>>;
  setEditMode: Dispatch<SetStateAction<boolean>>;
  setCreateMode: Dispatch<SetStateAction<boolean>>;
};

const Projects: FC<ProjectsProps> = ({
  selectedProject,
  setSelectedProject,
  setEditMode,
  setCreateMode,
}) => {
  const theme = useTheme();

  const projects = useProjectValue();

  const [selectedRole, setSelectedRole] = useState<ProjectRoleDTO | null>(null);

  const uris = projects
    ? projects?.map((project) => (project.medias ? project.medias[0].uri : ""))
    : [];

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
        onEdit={() => {
          setEditMode(true), setSelectedProject(index);
        }}
        onCreate={() => {
          setCreateMode(true), setSelectedProject(index);
        }}
        uri={uris[index]}
      />
    );
  };

  let enquiriesToRender: EnquiryDTO[] = [];
  if (selectedRole?.enquiries) {
    enquiriesToRender = selectedRole.enquiries;
  } else {
    if (projects && projects[selectedProject])
      projects[selectedProject].projectRoles?.forEach((role) =>
        role.enquiries?.forEach((enquiry) => enquiriesToRender.push(enquiry))
      );
  }

  return (
    <View>
      <Carousel
        vertical={false}
        data={uris}
        renderItem={renderItem}
        sliderWidth={windowWidth}
        itemWidth={windowWidth}
        onScrollIndexChanged={(index) => setSelectedProject(index)}
        inactiveSlideShift={-20}
      />
      <View
        style={{
          paddingHorizontal: 13,
          marginBottom: 11.5,
        }}
      >
        <ProjectRoleSelection
          roles={projects ? projects[selectedProject]?.projectRoles : null}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
        />
        <ViewApplicationsButton />
        <Text
          style={{
            ...theme.customFonts.primary.medium,
          }}
        >
          Shortlisted
        </Text>
      </View>
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: theme.colors.gray,
        }}
      >
        {enquiriesToRender.map((enquiry) => (
          <EnquiryChatPreview
            enquiry={enquiry}
            enquirer={false}
            key={enquiry.id}
          />
        ))}
      </View>
    </View>
  );
};

export default Projects;
