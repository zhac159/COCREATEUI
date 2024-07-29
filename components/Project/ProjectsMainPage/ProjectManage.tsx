import { EnquiryDTO, ProjectDTO } from "@/common/api/model";
import ChatType from "@/common/chat/chatType";
import GroupChatPreview from "@/components/Chats/GroupChatPreview";
import { FC, useMemo, useState } from "react";
import { View, StyleSheet } from "react-native";
import TeamMembersChats from "./TeamMembersChats";
import { SelectedRole } from "./projectMainPageHelper";
import ShortlistedEnquiriesChats from "./ShortlistedEnquiriesChats";
import ViewApplications from "../ViewApplications/ViewApplications";
import ViewApplicationsAndAssetsButton from "../ViewApplications/ViewApplicationsAndAssetsButton";

type ProjectManageProps = {
  project: ProjectDTO;
  selectedRole: SelectedRole;
};

const ProjectManage: FC<ProjectManageProps> = ({ project, selectedRole }) => {

  const [showApplications, setShowApplications] = useState(false);


  const enquiriesToRender: EnquiryDTO[] = useMemo(() => {
    let enquiries: EnquiryDTO[] = [];
    if (selectedRole.role?.enquiries) {
      enquiries = selectedRole.role?.enquiries;
    } else {
      project.projectRoles?.forEach((role) =>
        role.enquiries?.forEach((enquiry) => {
          enquiries.push(enquiry);
        })
      );
    }
    return enquiries;
  }, [selectedRole]);

  if (showApplications)
    return (
      <ViewApplications
        enquiries={enquiriesToRender.filter((enquiry) => !enquiry.shortlisted)}
        close={() => setShowApplications(false)}
      />
    );

  return (
    <View>
      <View
        style={styles.container}
      >
        <ViewApplicationsAndAssetsButton
          onPress={() => setShowApplications(true)}
          assetMode={!!selectedRole.assetMode}
          projectId={project.id}
        />
        <GroupChatPreview
          chatTargetIdTypePair={{
            chatTargetId: project.id,
            chatType: ChatType.Project,
          }}
          useSecondImage
          project={project}
        />
        <TeamMembersChats project={project} />
        <ShortlistedEnquiriesChats
          projectId={project.id}
          enquiries={enquiriesToRender}
          show={true}
        />
        {/* <AssetOfferChats
          assetOffers={projects[selectedProject].assetOffers}
          show={!!selectedRole.assetMode}
        /> */}
      </View>
    </View>
  );
};

export default ProjectManage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "10%",
    paddingHorizontal: "3%",
    gap: 15,
  },
});