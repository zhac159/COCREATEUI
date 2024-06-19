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

export type ChatMember = {
  userId: number;
  username: string;
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
};

export const useChatIcons = (
  currentChatData: CurrentChatData,
  userId: number,
  connection: any
) => {
  const theme = useTheme();

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
          },
        ];
      } else {
        return [
          {
            iconName: "pencil",
            onPress: () => {},
            iconColor: theme.colors.black,
            iconBackgroundColor: theme.colors.white,
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
            iconName: "heart",
            onPress: () => {
              handleConfirmEnquiry(
                currentChatData.enquiryInformation?.id!,
                currentChatData.enquiryInformation?.enquirer?.publicKey || "",
                currentChatData.enquiryInformation?.enquirer?.userId || 0,
                currentChatData.projectId || 0
              );
            },
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
            iconColor: theme.colors.black,
            iconBackgroundColor: theme.colors.white,
          },
        ];
      } else {
        return [
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
    const getIconsForChatType =
      chatIconConfig[currentChatData.chatTypeIdPair.chatType];
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
    });

    project.projectRoles.forEach((role) => {
      if (role.assignee) {
        chatMembersForProject.push({
          userId: role.assignee.userId,
          username: role.assignee.username,
          skill: role.skillType,
        });
      }
    });

    return chatMembersForProject;
  }, [project]);
};
