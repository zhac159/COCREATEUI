import { ProjectRoleDTO } from "@/common/api/model";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { View, Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { windowWidth } from "@/components/Account/Common/getWindowDimensions";
import { EnquiryDTO } from "@/common/api/model";
import { useProjectValue } from "@/components/RecoilStates/profileState";
import ProjectBanner from "./ProjectBanner/ProjectBanner";
import ViewApplications from "../ViewApplications/ViewApplications";
import AssetOfferChats from "./AssetOfferChats";
import ShortlistedEnquiriesChats from "./ShortlistedEnquiriesChats";
import { SelectedRole, bannerHeight } from "./projectMainPageHelper";
import ViewApplicationsAndAssetsButton from "../ViewApplications/ViewApplicationsAndAssetsButton";
import ChatType from "@/common/chat/chatType";
import GroupChatPreview from "@/components/Chats/GroupChatPreview";
import TeamMembersChats from "./TeamMembersChats";

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

  const [selectedRole, setSelectedRole] = useState<SelectedRole>({
    allRoles: true,
  });

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
      />
    );
  };

  const enquiriesToRender: EnquiryDTO[] = useMemo(() => {
    let enquiries: EnquiryDTO[] = [];

    if (selectedRole.role?.enquiries) {
      enquiries = selectedRole.role?.enquiries;
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

  if (projects.length === 0) return <View></View>;

  return (
    <View>
      <Carousel
        width={windowWidth}
        vertical={false}
        loop={false}
        data={uris}
        renderItem={renderItem}
        height={bannerHeight}
        panGestureHandlerProps={{
          hitSlop: { top: 20, bottom: -250, left: 20, right: 20 },
        }}
      />
      <View
        style={{
          flex: 1,
          paddingTop: "10%",
          paddingHorizontal: "3%",
          gap: 15,
        }}
      >
        <ViewApplicationsAndAssetsButton
          onPress={() => setShowApplications(true)}
          assetMode={!!selectedRole.assetMode}
          projectId={projects[selectedProject].id}
        />
        <GroupChatPreview
          chatTargetIdTypePair={{
            chatTargetId: projects[selectedProject].id,
            chatType: ChatType.Project,
          }}
          useSecondImage
          project={projects[selectedProject]}
        />
        <TeamMembersChats project={projects[selectedProject]} />
        <ShortlistedEnquiriesChats
          projectId={projects[selectedProject].id}
          enquiries={enquiriesToRender}
          show={true}
        />
        <AssetOfferChats
          assetOffers={projects[selectedProject].assetOffers}
          show={!!selectedRole.assetMode}
        />
      </View>
    </View>
  );
};

export default Projects;
