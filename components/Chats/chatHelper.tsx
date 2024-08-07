import {
  usePostApiEnquiryConfirm,
  usePutApiEnquiryRejectEnquiry,
} from "@/common/api/endpoints/cocreateApi";
import { CurrentChatData } from "../RecoilStates/currentChatDataState";
import { exchangeProjectKey } from "@/common/encryption/encryptionHelper";
import { useMemo } from "react";
import { useTheme } from "../Themes/theme";
import ChatType from "@/common/chat/chatType";
import { ProjectDTO, SkillType } from "@/common/api/model";
import { getChatId } from "@/common/chat/chatHelper";
import { router } from "expo-router";
import { useSetProjectState } from "../RecoilStates/profileState";

export type ChatMember = {
  userId: number;
  username: string;
  publicKey?: string;
  skill?: SkillType;
};

export type ChatTypeIdPair = {
  chatTargetId: number;
  chatType: ChatType;
};

export type ChatHeaderIconButton = {
  iconName: string;
  iconColor: string;
  iconBackgroundColor: string;
  onPress: () => void;
  iconActionName: string;
};

export const useChatIcons = (
  currentChatData: CurrentChatData,
  userId: number,
  connection: any
) => {
  const theme = useTheme();

  const setProjects = useSetProjectState();

  const { mutate: confirmEnquiry } = usePostApiEnquiryConfirm({
    mutation: {
      onSuccess: async (data: ProjectDTO) => {
        setProjects((state) =>
          state.map((project) => {
            if (project.id === data.id) {
              return data;
            }
            return project;
          })
        );
        router.navigate("/main/(tabs)/project");
      },
    },
  });

  const handleConfirmEnquiry = async (
    enquiryId: number,
    receiverPublicKey: string,
    receiverId: number,
    projectId: number,
    userId: number
  ) => {

    confirmEnquiry({
      data: {
        enquiryId: enquiryId,
      },
    });
    
    await exchangeProjectKey(
      receiverPublicKey,
      receiverId,
      getChatId(ChatType.Project, projectId),
      userId,
      connection
    );
  };

  const { mutate: rejectEnquiry } = usePutApiEnquiryRejectEnquiry({
    mutation: {
      onSuccess: async (data) => {
        console.log("Enquiry rejected");
      },
    },
  });

  const chatIconConfig: Record<
    ChatType,
    (currentChatData: CurrentChatData, userId: number) => ChatHeaderIconButton[]
  > = {
    [ChatType.AssetEnquiry]: (currentChatData, userId) => {
      if (
        currentChatData.assetOfferInformation?.project?.projectManager
          .userId === userId
      ) {
        return [
          {
            iconName: "bolt",
            onPress: () => {},
            iconColor: theme.colors.iconGray,
            iconBackgroundColor: theme.colors.white,
            iconActionName: "Accept Offer",
          },
        ];
      } else {
        return [
          {
            iconName: "pencil",
            onPress: () => {},
            iconColor: theme.colors.black,
            iconBackgroundColor: theme.colors.white,
            iconActionName: "Edit Offer",
          },
        ];
      }
    },
    [ChatType.Enquiry]: (currentChatData, userId) => {
      if (
        currentChatData.enquiryInformation?.projectManager?.userId === userId
      ) {
        return [
          {
            iconName: "eye",
            onPress: () => {
              router.navigate({
                pathname: "/main/projectRolePreview",
                params: {
                  projectRoleId:
                    currentChatData.enquiryInformation?.projectRoleId,
                },
              });
            },
            iconActionName: "View Role",
            iconColor: theme.colors.black,
            iconBackgroundColor: theme.colors.white,
          },
          {
            iconName: "heart",
            onPress: () => {
              handleConfirmEnquiry(
                currentChatData.enquiryInformation?.id!,
                currentChatData.enquiryInformation?.enquirer?.publicKey!,
                currentChatData.enquiryInformation?.enquirer?.userId!,
                currentChatData.enquiryInformation?.projectId!,
                userId
              );
            },
            iconColor: theme.colors.black,
            iconBackgroundColor: theme.colors.white,
            iconActionName: "Hire",
          },
          {
            iconName: "heart-crack",
            onPress: () => {
              rejectEnquiry({
                data: {
                  enquiryId: currentChatData.enquiryInformation?.id,
                },
              });
            },
            iconColor: theme.colors.black,
            iconBackgroundColor: theme.colors.white,
            iconActionName: "Dismiss",
          },
        ];
      } else {
        return [
          {
            iconName: "eye",
            onPress: () => {
              router.navigate({
                pathname: "/main/projectRolePreview",
                params: {
                  projectRoleId:
                    currentChatData.enquiryInformation?.projectRoleId,
                },
              });
            },
            iconActionName: "View Role",
            iconColor: theme.colors.black,
            iconBackgroundColor: theme.colors.white,
          },
          {
            iconName: "heart-crack",
            onPress: () => {
              rejectEnquiry({
                data: {
                  enquiryId: currentChatData.enquiryInformation?.id,
                },
              });
            },
            iconActionName: "Dismiss",
            iconColor: theme.colors.black,
            iconBackgroundColor: theme.colors.white,
          },
        ];
      }
    },
    [ChatType.Project]: (currentChatData, userId) => {
      // Default behavior for unhandled chat types
      return [];
    },
    [ChatType.ProjectColleague]: (currentChatData, userId) => {
      // Default behavior for unhandled chat types
      return [];
    },
  };

  return useMemo(() => {
    const getIconsForChatType = chatIconConfig[currentChatData.chatType];
    return getIconsForChatType
      ? getIconsForChatType(currentChatData, userId)
      : [];
  }, [currentChatData, userId]);
};

export const useGetProjectChatMembers = (project: ProjectDTO) => {
  return useMemo(() => {
    var chatMembersForProject: ChatMember[] = [];

    chatMembersForProject.push({
      userId: project.projectManager.userId,
      username: project.projectManager.username,
      publicKey: project.projectManager.publicKey!,
    });

    project.projectRoles.forEach((role) => {
      if (role.assignee && role.assignee.publicKey) {
        chatMembersForProject.push({
          userId: role.assignee.userId,
          username: role.assignee.username,
          publicKey: role.assignee.publicKey,
          skill: role.skillType,
        });
      }
    });

    return chatMembersForProject;
  }, [project]);
};
