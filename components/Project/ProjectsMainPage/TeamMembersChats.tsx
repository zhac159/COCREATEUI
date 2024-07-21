import React, { FC, useMemo } from "react";
import { View } from "react-native";
import { ProjectDTO } from "@/common/api/model";
import { getProjectUsers } from "@/common/chat/chatHelper";
import { useUserIdValue } from "@/components/RecoilStates/profileState";
import ChatType from "@/common/chat/chatType";
import ChatPreview from "@/components/Chats/ChatPreview";

type TeamMembersChatsProps = {
  project: ProjectDTO;
};

const TeamMembersChats: FC<TeamMembersChatsProps> = ({ project }) => {

  const usersInProject = useMemo(() => {
    return getProjectUsers(project);
  }, [project]);

  const userId = useUserIdValue();

  return (
    <View>
      {usersInProject
        .filter((user) => user.userInformation.userId !== userId)
        .map((user) => (
          <ChatPreview
            chatImage="https://picsum.photos/200/300"
            skillType={user.skill}
            chatName={user.userInformation.username }
            chatTargetIdTypePair={{
              chatTargetId: user.userInformation.userId,
              chatType: ChatType.ProjectColleague,
            }}
            targetPublicKey={user.userInformation.publicKey}
            key={user.userInformation.userId + "-chat-user"}
          />
        ))}
    </View>
  );
};

export default TeamMembersChats;