import { CurrentChatData } from "../../RecoilStates/currentChatDataState";
import { FC } from "react";
import { View, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import { useTheme } from "../../Themes/theme";
import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import { windowWidth } from "../../Account/Common/getWindowDimensions";
import ChatHeaderIconButtons from "./ChatHeaderIconButtons";
import { HubConnection } from "@microsoft/signalr";
import ChatHeaderText from "./ChatHeaderText";
import { BlurView } from "expo-blur";

type ChatHeaderProps = {
  currentChatData: CurrentChatData;
  userId: number;
  connection: HubConnection;
};

const ChatHeader: FC<ChatHeaderProps> = ({
  currentChatData,
  userId,
  connection,
}) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <BlurView
        style={styles.blurView}        
        intensity={100}
        tint="light"
      />
      <View style={styles.content}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 30,
          }}
        >
          <IconButton
            onPress={() => router.back()}
            icon={() => (
              <FontAwesome6
                name="chevron-left"
                size={20}
                solid
                color={theme.colors.black}
              />
            )}
            style={{
              margin: 0,
              padding: 0,
            }}
            size={26}
          />
          <ChatHeaderText currentChatData={currentChatData} />
        </View>
        <ChatHeaderIconButtons
          currentChatData={currentChatData}
          userId={userId}
          connection={connection}
        />
      </View>
    </View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  container: {
    top: 0,
    height: 116,
    width: "100%",
    overflow: "hidden",
    position: "absolute",
    justifyContent: "flex-end",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    bottom: 16,
    paddingRight: 16,
  },
  blurView: {
    width: windowWidth,
    height: 116,
    position: "absolute",
  },
});
