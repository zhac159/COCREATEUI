import { ProjectRoleDTO } from "@/common/api/model";
import { Dispatch, FC, SetStateAction, useEffect, useMemo, useState } from "react";
import { View, Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { windowWidth } from "@/components/Account/Common/getWindowDimensions";
import { EnquiryDTO } from "@/common/api/model";
import { useProjectValue } from "@/components/RecoilStates/profileState";
import ProjectBanner from "./ProjectBanner/ProjectBanner";
import ViewApplicationsButton from "../ViewApplications/ViewApplicationsButton";
import { ChatType } from "@/components/Chats/ChatHelper";
import ViewApplications from "../ViewApplications/ViewApplications";
import ProjectChatPreview from "@/components/Chats/ProjectChatsPreview";
import { ScrollView } from "react-native-gesture-handler";
import AssetOfferChats from "./AssetOfferChats";
import ShortlistedEnquiriesChats from "./ShortlistedEnquiriesChats";

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
  const projects = useProjectValue();

  const [selectedRole, setSelectedRole] = useState<ProjectRoleDTO | null>(null);

  const [selectAssetsMode, setSelectAssetsMode] = useState(false);

  const [showApplications, setShowApplications] = useState(false);


  const uris = projects
    ? projects?.map((project) => project.medias[0].uri)
    : [];

  const handleEdit = (index: number) => {
    setEditMode(true);
    setSelectedProject(index);
  };

  const handleCreate = (index: number) => {
    setCreateMode(true);
    setSelectedProject(index);
  };

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
        onEdit={() => handleEdit(index)}
        onCreate={() => handleCreate(index)}
        uri={uris[index]}
        roles={projects[selectedProject].projectRoles}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
        selectAssetsMode={selectAssetsMode}
        setSelectAssetsMode={setSelectAssetsMode}
      />
    );
  };

  const enquiriesToRender: EnquiryDTO[] = useMemo(() => {
    let enquiries: EnquiryDTO[] = [];

    if (selectedRole?.enquiries) {
      enquiries = selectedRole.enquiries;
    } else {
      if (projects && projects[selectedProject]) {
        projects[selectedProject].projectRoles?.forEach((role) =>
          role.enquiries?.forEach((enquiry) => {
            enquiries.push(enquiry);
          })
        );
      }
    }
    return enquiries;
  }, [selectedRole, projects, selectedProject]);

  if (showApplications)
    return (
      <ViewApplications
        enquiries={enquiriesToRender.filter((enquiry) => !enquiry.shortlisted)}
        close={() => setShowApplications(false)}
      />
    );

  // if (projects && !projects[selectedProject]) return <Text>Loading...</Text>;

  return (
    <View>
      <Carousel
        width={windowWidth}
        vertical={false}
        loop={false}
        data={uris}
        renderItem={renderItem}
        height={400}
        panGestureHandlerProps={{
          hitSlop: { top: 20, bottom: -250, left: 20, right: 20 },
        }}
      />
      <ScrollView
        style={{
          height: Dimensions.get("window").height - 350,
        }}
      >
        <ViewApplicationsButton
          onPress={() => setShowApplications(true)}
          assetMode={selectAssetsMode}
        />
        <ShortlistedEnquiriesChats enquiries={enquiriesToRender} />
        <AssetOfferChats assetOffers={projects[selectedProject].assetOffers} />
        <ProjectChatPreview
          chatTargetIdTypePair={{
            chatTargetId: projects![selectedProject].id!,
            chatType: ChatType.Project,
          }}
          project={projects![selectedProject]}
        />
      </ScrollView>
    </View>
  );
};

export default Projects;
