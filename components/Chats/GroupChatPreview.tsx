import { FC, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "../Themes/theme";
import Media from "../MediaViewer/Media";
import { router } from "expo-router";
import { useSetCurrentChatDataState } from "../RecoilStates/currentChatDataState";
import { ChatTypeIdPair, useGetProjectChatMembers } from "./chatHelper";
import { useLastMessagesByTargetAndChatTypeState } from "../RecoilStates/lastMessagesState";
import { useSQLiteContext } from "expo-sqlite/next";
import { fetchMessages } from "@/common/database/databaseHelper";
import { ProjectDTO } from "@/common/api/model";
import GroupChatPreviewMessages from "./GroupChatPreviewMessages";
import { findUserById } from "@/common/chat/chatHelper";

type GroupChatPreviewProps = {
  chatTargetIdTypePair: ChatTypeIdPair;
  project: ProjectDTO;
  showImage: boolean;
};

const GroupChatPreview: FC<GroupChatPreviewProps> = ({
  chatTargetIdTypePair,
  project,
  showImage = true,
}) => {
  const theme = useTheme();

  const setCurrentChatData = useSetCurrentChatDataState();

  const database = useSQLiteContext();

  const [lastMessages, setLastMessages] =
    useLastMessagesByTargetAndChatTypeState(chatTargetIdTypePair);

  const chatMembers = useGetProjectChatMembers(project);

  useEffect(() => {
    fetchMessages(database, chatTargetIdTypePair, 3).then((fetchedMessages) => {
      setLastMessages(fetchedMessages);
    });
  }, [database]);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        setCurrentChatData({
          chatName: project.name,
          colors: [],
          chatTypeIdPair: chatTargetIdTypePair,
          chatMembers: chatMembers,
        });
        router.push("/main/chat");
      }}
      style={{
        ...styles.container,
        backgroundColor: !showImage ? theme.colors.lightGray : "transparent",
      }}
    >
      {showImage && (
        <Media
          uri={
            project.medias
              ? project.medias[1].uri
              : "https://picsum.photos/200/300  "
          }
          style={styles.image}
          onPress={() => {}}
        />
      )}
      <View
        style={{
          ...styles.detailsContainer,
        }}
      >
        <Text
          style={{
            ...theme.customFonts.secondary.medium,
            fontSize: 20,
            paddingBottom: 10,
          }}
        >
          {project.name}
        </Text>
        {[...lastMessages]
          .slice()
          .reverse()
          .map((message) => (
            <GroupChatPreviewMessages
              message={message}
              key={message.id}
              sender={findUserById(project, message.senderId || 0)}
            />
          ))}
      </View>
    </TouchableOpacity>
  );
};

export default GroupChatPreview;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    opacity: 1,
    position: "absolute",
    pointerEvents: "none",
  },
  container: {
    height: "100%",
  },
  detailsContainer: {
    padding: "3%",
    gap: 11,
  },
});
