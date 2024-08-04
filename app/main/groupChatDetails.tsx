import { ChatMember } from "@/components/Chats/chatHelper";
import StyledButton from "@/components/Common/StyledButton";
import GroupChatMediaList from "@/components/GroupChatDetails/GroupChatMediaList";
import GroupChatMembersList from "@/components/GroupChatDetails/GroupChatMembersList";
import { useTheme } from "@/components/Themes/theme";
import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Divider } from "react-native-paper";

export default function GroupChatDetails() {
  const theme = useTheme();

  const { name, members, chatId,  projectId} = useLocalSearchParams<{
    name: string;
    members: string;
    chatId: string;
    projectId: string;
  }>();

  const projectIdInt = parseInt(projectId!);

  const chatMembers: ChatMember[] = JSON.parse(members!);

  return (
    <ScrollView
    showsVerticalScrollIndicator={false}
      style={{
        ...styles.container,
        backgroundColor: theme.colors.white,
      }}
    >
      <View>
        <Text
          style={{
            ...theme.customFonts.secondary.large,
            ...styles.title,
          }}
        >
          {name}
        </Text>
      </View>
      <Divider
        style={{
          marginVertical: 10,
          backgroundColor: theme.colors.black,
        }}
      />
      <GroupChatMembersList groupChatMembers={chatMembers} groupChatId={chatId!} projectId={projectIdInt} />
      <Divider
        style={{
          marginVertical: 30,
          backgroundColor: theme.colors.black,
        }}
      />
      <Text
        style={{
          ...theme.customFonts.primary.medium,
        }}
      >
        Project
      </Text>
      <StyledButton
        onPress={() => {}}
        text="View Project"
        style={{
          alignSelf: "flex-end",
          backgroundColor: theme.colors.black,
        }}
      />

      <GroupChatMediaList groupChatId={chatId!} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: "6%",
  },
  title: {
    fontSize: 25,
    fontWeight: "400",
    alignSelf: "center",
  },
});
