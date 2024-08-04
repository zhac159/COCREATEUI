import React, { FC } from "react";
import { StyleSheet, TouchableWithoutFeedback, Text, View } from "react-native";
import { CurrentChatData } from "@/components/RecoilStates/currentChatDataState";
import { useTheme } from "@/components/Themes/theme";
import { router } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";
import ChatType from "@/common/chat/chatType";

type ChatHeaderTextProps = {
  currentChatData: CurrentChatData;
};

const ChatHeaderText: FC<ChatHeaderTextProps> = ({ currentChatData }) => {
  const theme = useTheme();

  const handleChatHeaderPress = () => {
    if (currentChatData.chatMembers) {
      if (currentChatData.chatType === ChatType.Project) {
        router.navigate({
          pathname: "/main/groupChatDetails",
          params: {
            members: JSON.stringify(currentChatData.chatMembers),
            name: currentChatData.chatName,
            chatId: currentChatData.chatId,
            projectId: currentChatData.projectInformation?.id,
          },
        });
      } else {
        router.navigate({
          pathname: "/main/accountViewer",
          params: {
            userId: currentChatData.chatMembers[0].userId,
          },
        });
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleChatHeaderPress}>
      <View
        style={{
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 15,
          }}
        >
          <Text
            style={{
              ...theme.customFonts.secondary.medium,
              fontSize: 25,
              fontWeight: "400",
            }}
          >
            {currentChatData.chatName}
          </Text>
          <FontAwesome6
            name="chevron-right"
            size={20}
            solid
            color={theme.colors.black}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ChatHeaderText;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
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
