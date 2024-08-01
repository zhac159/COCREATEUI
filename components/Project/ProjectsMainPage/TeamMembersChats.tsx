import React, { FC, useMemo } from "react";
import { View, Text } from "react-native";
import { ProjectDTO } from "@/common/api/model";
import { getChatId, getProjectUsers } from "@/common/chat/chatHelper";
import { useUserIdValue } from "@/components/RecoilStates/profileState";
import ChatType from "@/common/chat/chatType";
import ChatPreview from "@/components/Chats/ChatPreview";
import { useTheme } from "@/components/Themes/theme";

type TeamMembersChatsProps = {
  project: ProjectDTO;
};

const TeamMembersChats: FC<TeamMembersChatsProps> = ({ project }) => {
  const userId = useUserIdValue();

  const usersInProject = useMemo(() => {
    return getProjectUsers(project).filter(
      (user) => user.userInformation.userId !== userId
    );
  }, [project]);

  const theme = useTheme();

  return (
    <View>
      {usersInProject.length > 0 && (
        <Text
          style={{
            ...theme.customFonts.primary.medium,
            paddingBottom: 18,
            fontWeight: "900",
          }}
        >
          Your Team
        </Text>
      )}
      {usersInProject
        .map((user) => (
          <ChatPreview
            chatImage="https://picsum.photos/200/300"
            skillType={user.skill}
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
  );
};

export default TeamMembersChats;
