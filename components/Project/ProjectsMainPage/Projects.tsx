import { ProjectRoleDTO } from "@/common/api/model";
import {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";
import { View, Text } from "react-native";
import { Carousel } from "react-native-snap-carousel";
import { windowWidth } from "@/components/Account/Common/getWindowDimensions";
import { useTheme } from "@/components/Themes/theme";
import { EnquiryDTO } from "@/common/api/model";
import { useProjectValue } from "@/components/RecoilStates/profileState";
import ProjectBanner from "./ProjectBanner/ProjectBanner";
import ViewApplicationsButton from "../ViewApplications/ViewApplicationsButton";
import ProjectRoleSelection from "./ProjectRoleSelection";
import ChatPreview from "@/components/Chats/ChatPreview";
import { ChatType } from "@/components/Chats/ChatHelper";
import ViewApplications from "../ViewApplications/ViewApplications";
import { Button } from "react-native-paper";
import { usePostApiEnquiryConfirm } from "@/common/api/endpoints/cocreateApi";
import { exchangeProjectKey } from "@/common/encryption/encryptionHelper";
import { ConnectionContext } from "@/app/main/_layout";
import ProjectChatPreview from "@/components/Chats/ProjectChatsPreview";

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
  const connection = useContext(ConnectionContext);
  const projects = useProjectValue();

  const [selectedRole, setSelectedRole] = useState<ProjectRoleDTO | null>(null);

  const [showApplications, setShowApplications] = useState(false);

  const { mutate: confirmEnquiry } = usePostApiEnquiryConfirm({
    mutation: {
      onSuccess: async (data) => {
        console.log("Enquiry confirmed");
      },
    },
  });

  const handleConfirmEnquiry = async (
    enquiryId: number,
    receiverPublicKey: string,
    receiverId: number,
    projectId: number
  ) => {
    confirmEnquiry({
      data: {
        enquiryId: enquiryId,
      },
    });
    await exchangeProjectKey(
      receiverPublicKey,
      receiverId,
      projectId,
      connection
    );
  };

  const uris = projects
    ? projects?.map((project) => (project.medias ? project.medias[0].uri : ""))
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
        id={project?.id ?? 0}
        name={project?.name ?? "N/A"}
        onEdit={() => handleEdit(index)}
        onCreate={() => handleCreate(index)}
        uri={uris[index]}
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

  if(projects && !projects[selectedProject]) return <Text>Loading...</Text>

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
        <ViewApplicationsButton onPress={() => setShowApplications(true)} />
      </View>
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: theme.colors.gray,
        }}
      >
        {enquiriesToRender
          .filter((enquiry) => enquiry.shortlisted)
          .map((enquiry) => (
            <View key={enquiry.id}>
              <ChatPreview
                chatName={enquiry.enquirer?.username || "N/A"}
                chatTargetIdTypePair={{
                  chatTargetId: enquiry.enquirer?.userId || 0,
                  chatType: ChatType.Enquiry,
                }}
                chatImage="https://picsum.photos/200/300"
              />
              <Button
                onPress={() => {
                  handleConfirmEnquiry(
                    enquiry.id!,
                    enquiry.enquirer?.publicKey || "",
                    enquiry.enquirer?.userId || 0,
                    projects ? projects[selectedProject]?.id! : 2
                  );
                }}
              >
                <Text>Confirm</Text>
              </Button>
            </View>
          ))}
      </View>
      <ProjectChatPreview
        chatTargetIdTypePair={{
          chatTargetId: projects![selectedProject].id!,
          chatType: ChatType.Project,
        }}
        project={projects![selectedProject]}
        key={"opdslkfa;jaswpojasdpoajs"}
      />
    </View>
  );
};

export default Projects;
