import { FC, useMemo } from "react";
import { StyleSheet, View, Text } from "react-native";
import { ProjectDTO } from "@/common/api/model";
import GroupChatPreview from "./GroupChatPreview";
import Swiper from "react-native-swiper";
import { getChatId, getProjectUsers } from "@/common/chat/chatHelper";
import ChatPreview from "./ChatPreview";
import { useUserIdValue } from "../RecoilStates/profileState";
import { useTheme } from "../Themes/theme";
import ChatType from "@/common/chat/chatType";

type ProjectChatPreviewProps = {
  project: ProjectDTO;
  show?: boolean;
};

const ProjectChatPreview: FC<ProjectChatPreviewProps> = ({
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
      <View style={styles.titleContainer}>
        <View
          style={{
            ...styles.lines,
            backgroundColor: theme.colors.grayer,
          }}
        />
        <Text
          style={{
            ...theme.customFonts.secondary.medium,
            ...styles.title,
            color: theme.colors.black,
          }}
        >
          {project.name}
        </Text>
        <View
          style={{
            ...styles.lines,
            backgroundColor: theme.colors.grayer,
          }}
        />
      </View>
      <View
        style={{
          ...styles.container,
        }}
      >
        <Swiper showsPagination={true} loop={false}>
          <GroupChatPreview
            chatId={getChatId(ChatType.Project, project.id)}
            project={project}
          />
          <View>
            {usersInProject
              .filter(
                (user) =>
                  user.userInformation.userId !== userId &&
                  user.userInformation.publicKey
              )
              .map((user) => (
                <ChatPreview
                  chatImage="https://picsum.photos/200/300"
                  chatName={user.userInformation.username}
                  chatId={getChatId(
                    ChatType.ProjectColleague,
                    project.id,
                    userId,
                    user.userInformation.userId
                  )}
                  chatType={ChatType.ProjectColleague}
                  chatMembers={[
                    {
                      userId: user.userInformation.userId,
                      username: user.userInformation.username,
                      publicKey: user.userInformation.publicKey!,
                    },
                  ]}
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
  lines: {
    height: 1,
    flex: 1,
    marginBottom: 10,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "400",
    paddingBottom: 10,
    fontSize: 20,
    alignSelf: "center",
    paddingHorizontal: 10,
  },
});
