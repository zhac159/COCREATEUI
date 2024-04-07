import { FC, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "../Themes/theme";
import Media from "../MediaViewer/Media";
import { router } from "expo-router";
import { useSetCurrentChatTargetIdState } from "../RecoilStates/currentChatTargetIdState";
import { ChatTypeIdPair } from "./ChatHelper";
import { useLastMessagesByTargetAndChatTypeState } from "../RecoilStates/lastMessagesState";
import { useSQLiteContext } from "expo-sqlite/next";
import { fetchLastMessages } from "@/common/database/databaseHelper";
import { ProjectDTO } from "@/common/api/model";
import GroupChatPreviewMessages from "./GroupChatPreviewMessages";
import { findUserById } from "@/common/chat/chatHelper";

type GroupChatPreviewProps = {
  chatTargetIdTypePair: ChatTypeIdPair;
  project: ProjectDTO;
};

const GroupChatPreview: FC<GroupChatPreviewProps> = ({
  chatTargetIdTypePair,
  project,
}) => {
  const theme = useTheme();

  const setChatTargetId = useSetCurrentChatTargetIdState();

  const database = useSQLiteContext();

  const [lastMessages, setLastMessages] =
    useLastMessagesByTargetAndChatTypeState(chatTargetIdTypePair);

  useEffect(() => {
    fetchLastMessages(database, chatTargetIdTypePair).then(
      (fetchedMessages) => {
        setLastMessages(fetchedMessages);
      }
    );
  }, [database]);

  console.log(lastMessages);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        setChatTargetId(chatTargetIdTypePair);
        router.push("/main/chat");
      }}
      style={{
        ...styles.container,
      }}
    >
      <Media
        uri={project.medias ? project.medias[1].uri:"https://picsum.photos/200/300  "}
        style={styles.image}
        onPress={() => {}}
      />
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
