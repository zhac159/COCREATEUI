import React, { FC, useMemo } from "react";
import { StyleSheet, View, Text } from "react-native";
import { IconButton } from "react-native-paper";
import { FontAwesome6 } from "@expo/vector-icons";
import { usePostApiEnquiryConfirm } from "@/common/api/endpoints/cocreateApi";
import { exchangeProjectKey } from "@/common/encryption/encryptionHelper";
import { HubConnection } from "@microsoft/signalr";
import { CurrentChatData } from "@/components/RecoilStates/currentChatDataState";
import { useTheme } from "@/components/Themes/theme";
import { ChatHeaderIconButton, useChatIcons } from "../chatHelper";

type ChatHeaderButtonsProps = {
  currentChatData: CurrentChatData;
  userId: number;
  connection: HubConnection;
};

const ChatHeaderIconButtons: FC<ChatHeaderButtonsProps> = ({
  currentChatData,
  userId,
  connection,
}) => {
  const theme = useTheme();

  const chatIcons: ChatHeaderIconButton[] = useChatIcons(
    currentChatData,
    userId,
    connection
  );


  return (
    <View
      style={{
        ...styles.container,
      }}
    >
      {chatIcons.map((chatIcon, index) => {
        return (
          <View
            key={index}
            style={{
              alignItems: "center",
            }}
          >
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
            <Text
              style={{
                ...theme.customFonts.primary.small,
                color: theme.colors.black,
                fontWeight: "700",
                fontSize: 12,
              }}
            >
              {chatIcon.iconActionName}
            </Text>
          </View>
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
