import { FC, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "../Themes/theme";
import Media from "../MediaViewer/Media";
import { router } from "expo-router";
import { useSetCurrentChatDataState } from "../RecoilStates/currentChatDataState";
import { ChatTypeIdPair, useGetProjectChatMembers } from "./chatHelper";
import { useSQLiteContext } from "expo-sqlite/next";
import { fetchMessages } from "@/common/database/databaseHelper";
import { ProjectDTO } from "@/common/api/model";
import GroupChatPreviewMessages from "./GroupChatPreviewMessages";
import { findUserById } from "@/common/chat/chatHelper";
import { useLastMessagesByChatIdState } from "../RecoilStates/lastMessagesState";
import ChatType from "@/common/chat/chatType";

type GroupChatPreviewProps = {
  chatId: string;
  project: ProjectDTO;
  useSecondImage?: boolean;
};

const GroupChatPreview: FC<GroupChatPreviewProps> = ({
  chatId,
  project,
  useSecondImage = false,
}) => {
  const theme = useTheme();

  const setCurrentChatData = useSetCurrentChatDataState();

  const database = useSQLiteContext();

  const [lastMessages, setLastMessages] =
    useLastMessagesByChatIdState(chatId);
    

  const chatMembers = useGetProjectChatMembers(project);

  useEffect(() => {
    fetchMessages(database, chatId, 3).then((fetchedMessages) => {
      setLastMessages(fetchedMessages);
    });
  }, [database, chatId]);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        setCurrentChatData({
          chatName: project.name,
          chatType: ChatType.Project,
          colors: [],
          chatId: chatId,
          chatMembers: chatMembers,
        });
        router.push("/main/chat");
      }}
      style={{
        ...styles.container,
        backgroundColor: theme.colors.white,
      }}
    >
      <Media
        uri={
          project.medias[useSecondImage ? 1 : 0]?.uri ||
          "https://picsum.photos/200/300"
        }
        style={styles.image}
      />
      <View
        style={{
          ...styles.detailsContainer,
        }}
      >
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
    width: 175,
    height: 175,
    opacity: 1,
    marginTop: 20,
    position: "absolute",
    pointerEvents: "none",
    alignSelf: "center",
    borderRadius: 100,
  },
  container: {
    height: 225,
  },
  detailsContainer: {
    padding: "3%",
    gap: 11,
  },
});
