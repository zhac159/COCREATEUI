import { FC, useMemo } from "react";
import { StyleSheet, View, Text } from "react-native";
import { ChatTypeIdPair } from "./chatHelper";
import { ProjectDTO } from "@/common/api/model";
import GroupChatPreview from "./GroupChatPreview";
import Swiper from "react-native-swiper";
import { getProjectUsers } from "@/common/chat/chatHelper";
import ChatPreview from "./ChatPreview";
import { useUserIdValue } from "../RecoilStates/profileState";
import { useTheme } from "../Themes/theme";
import ChatType from "@/common/chat/chatType";

type ProjectChatPreviewProps = {
  chatTargetIdTypePair: ChatTypeIdPair;
  project: ProjectDTO;
  show?: boolean;
};

const ProjectChatPreview: FC<ProjectChatPreviewProps> = ({
  chatTargetIdTypePair,
  project,
  show = true,
}) => {
  const theme = useTheme();

  const usersInProject = useMemo(() => {
    return getProjectUsers(project);
  }, [project]);

  const userId = useUserIdValue();

  if (!show) {
    return null;
  }

  return (
    <View>
      <Text
        style={{
          ...theme.customFonts.primary.medium,
          color: theme.colors.black,
          paddingTop: 20,
          paddingBottom: 10,
          paddingLeft: 10,
        }}
      >
        Team Chat
      </Text>
      <View
        style={{
          ...styles.container,
        }}
      >
        <Swiper showsPagination={true} loop={false}>
          <GroupChatPreview
            chatTargetIdTypePair={chatTargetIdTypePair}
            project={project}
          />
          <View>
            {usersInProject
              .filter((user) => user.userInformation.userId !== userId)
              .map((user) => (
                <ChatPreview
                  chatImage="https://picsum.photos/200/300"
                  chatName={user.userInformation.username}
                  chatTargetIdTypePair={{
                    chatTargetId: user.userInformation.userId,
                    chatType: ChatType.ProjectColleague,
                  }}
                  targetPublicKey={user.userInformation.publicKey}
                  key={user.userInformation.userId + "-chat-user"}
                />
              ))}
          </View>
        </Swiper>
      </View>
    </View>
  );
};

export default ProjectChatPreview;

const styles = StyleSheet.create({
  container: {
    height: 283,
  },
});
