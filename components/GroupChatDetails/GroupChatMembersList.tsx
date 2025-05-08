import { ChatMember } from "../Chats/chatHelper";
import { useTheme } from "../Themes/theme";
import { View, Text, StyleSheet } from "react-native";
import { FC } from "react";
import SkillIcon from "../Account/Skills/SkillIcon";
import { getSkill } from "../Account/Skills/skillHelper";
import StyledButton from "../Common/StyledButton";
import SeeProfileButton from "../Common/SeeProfileButton";
import { useSetCurrentChatDataState } from "../RecoilStates/currentChatDataState";
import ChatType from "@/common/chat/chatType";
import { router } from "expo-router";
import { useUserIdValue } from "../RecoilStates/profileState";
import { getChatId } from "@/common/chat/chatHelper";

type GroupChatMembersListProps = {
  groupChatMembers: ChatMember[];
  groupChatId: string;
  projectId: number;
};

const GroupChatMembersList: FC<GroupChatMembersListProps> = ({
  groupChatMembers,
  groupChatId,
  projectId,
}) => {
  const theme = useTheme();

  const setCurrentChatData = useSetCurrentChatDataState();

  const userId = useUserIdValue();

  const handlePressMessage = (ChatMember: ChatMember) => {
    setCurrentChatData({
      chatName: ChatMember.username,
      colors: [],
      chatMembers: groupChatMembers,
      chatType: ChatType.ProjectColleague,
      chatId: getChatId(
        ChatType.ProjectColleague,
        projectId,
        userId,
        ChatMember.userId
      ),
    });
    router.push("/main/chat");
  };

  return (
    <View
      style={{
        ...styles.container,
      }}
    >
      <Text
        style={{
          ...theme.customFonts.primary.medium,
        }}
      >
        Team
      </Text>
      {groupChatMembers.map((member, index) => {
        return (
          <View key={index} style={styles.memeberContainer}>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <SkillIcon skillType={member.skill} />
              <View
                style={{
                  marginLeft: 10,
                }}
              >
                <Text
                  style={{
                    ...theme.customFonts.primary.medium,
                    fontSize: 14,
                    fontWeight: "500",
                  }}
                >
                  {getSkill(member.skill)}
                </Text>
                <Text
                  style={{
                    ...theme.customFonts.secondary.large,
                    fontSize: 20,
                    fontWeight: "400",
                  }}
                >
                  {member.username}
                </Text>
              </View>
            </View>
            <View
              style={{
                gap: 10,
                alignItems: "flex-end",
              }}
            >
              {member.userId !== userId && (
                <StyledButton
                  onPress={() => {
                    handlePressMessage(member);
                  }}
                  text="Message"
                  style={{
                    backgroundColor: theme.colors.primary,
                  }}
                />
              )}
              <SeeProfileButton userId={member.userId} />
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default GroupChatMembersList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    gap: 20,
  },
  memeberContainer: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "space-between",
  },
});
