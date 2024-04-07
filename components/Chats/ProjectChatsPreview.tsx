import { FC, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { ChatType, ChatTypeIdPair } from "./ChatHelper";
import { ProjectDTO } from "@/common/api/model";
import GroupChatPreview from "./GroupChatPreview";
import Swiper from "react-native-swiper";
import { getProjectUsers } from "@/common/chat/chatHelper";
import ChatPreview from "./ChatPreview";
import { useUserIdValue } from "../RecoilStates/profileState";

type ProjectChatPreviewProps = {
  chatTargetIdTypePair: ChatTypeIdPair;
  project: ProjectDTO;
};

const ProjectChatPreview: FC<ProjectChatPreviewProps> = ({
  chatTargetIdTypePair,
  project,
}) => {
  const usersInProject = useMemo(() => {
    return getProjectUsers(project);
  }, [project]);

  const userId = useUserIdValue();

  return (
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
            .filter((user) => user.userId !== userId)
            .map((user) => (
              <ChatPreview
                chatImage="https://picsum.photos/200/300"
                chatName={user.username || "N/A"}
                chatTargetIdTypePair={{
                  chatTargetId: user.userId || 0,
                  chatType: ChatType.Enquiry,
                }}
                key={user.userId + "-chat-user"}
              />
            ))}
        </View>
      </Swiper>
    </View>
  );
};

export default ProjectChatPreview;

const styles = StyleSheet.create({
  container: {
    height: 283,
  },
});
