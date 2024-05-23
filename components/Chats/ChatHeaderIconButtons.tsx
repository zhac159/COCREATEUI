import React, { FC, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { CurrentChatData } from "../RecoilStates/currentChatDataState";
import { useTheme } from "../Themes/theme";
import { ChatHeaderIconButton, ChatType } from "./chatHelper";
import { IconButton } from "react-native-paper";
import { FontAwesome6 } from "@expo/vector-icons";
import { usePostApiEnquiryConfirm } from "@/common/api/endpoints/cocreateApi";
import { exchangeProjectKey } from "@/common/encryption/encryptionHelper";
import { HubConnection } from "@microsoft/signalr";

type ChatHeaderButtonsProps = {
  currentChatData: CurrentChatData;
  userId: number;
  connection: HubConnection;
};

const ChatHeaderIconButtons: FC<ChatHeaderButtonsProps> = ({
  currentChatData,
  userId,
  connection
}) => {
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


  const chatIcons: ChatHeaderIconButton[] = useMemo(() => {
    var chatIcons: ChatHeaderIconButton[] = [];

    if (currentChatData.chatTypeIdPair.chatType === ChatType.AssetEnquiry) {
      if (
        currentChatData.assetOfferInformation &&
        currentChatData.assetOfferInformation.project?.projectManager.userId ===
          userId
      ) {
        chatIcons.push({
          iconName: "bolt",
          onPress: () => {},
          iconColor: theme.colors.iconGray,
          iconBackgroundColor: theme.colors.white,
        });
      } else {
        chatIcons.push({
          iconName: "pencil",
          onPress: () => {},
          iconColor: theme.colors.black,
          iconBackgroundColor: theme.colors.white,
        });
      }
    }
    if (currentChatData.chatTypeIdPair.chatType === ChatType.Enquiry) {
      if (
        currentChatData.enquiryInformation &&
        currentChatData.enquiryInformation.projectManager?.userId === userId
      ) {
        chatIcons.push(
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
            onPress: () => {},
            iconColor: theme.colors.black,
            iconBackgroundColor: theme.colors.white,
          }
        );
      } else {
        chatIcons.push({
          iconName: "heart",
          onPress: () => {},
          iconColor: theme.colors.black,
          iconBackgroundColor: theme.colors.white,
        });
      }
    }
    return chatIcons;
  }, [currentChatData]);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
      }}
    >
      {chatIcons.map((chatIcon, index) => {
        return (
          <IconButton
            key={index}
            onPress={chatIcon.onPress}
            icon={() => (
              <FontAwesome6
                name={chatIcon.iconName}
                size={18}
                solid
                color={chatIcon.iconColor}
              />
            )}
            style={{
              margin: 0,
              padding: 0,
              backgroundColor: chatIcon.iconBackgroundColor,
            }}
            size={20}
          />
        );
      })}
    </View>
  );
};

export default ChatHeaderIconButtons;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    bottom: 16,
  },
  blurView: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: -1,
  },
});
