import { FC, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "../Themes/theme";
import { formatDistance, parseISO } from "date-fns";
import { router } from "expo-router";
import { useSetCurrentChatDataState } from "../RecoilStates/currentChatDataState";
import { ChatTypeIdPair } from "./chatHelper";
import { useSQLiteContext } from "expo-sqlite/next";
import { fetchMessages } from "@/common/database/databaseHelper";
import {
  AssetOfferDTO,
  EnquiryDTO,
  ProjectDTO,
  SkillType,
} from "@/common/api/model";
import SkillIcon from "../Account/Skills/SkillIcon";
import { useLastMessagesByTargetAndChatTypeState } from "../RecoilStates/lastMessagesState";
import Media from "../MediaViewer/Media";

type ChatPreviewProps = {
  chatTargetIdTypePair: ChatTypeIdPair;
  chatImage: string;
  chatName: string;
  enquiryInformation?: EnquiryDTO;
  projectInformation?: ProjectDTO;
  assetOfferInformation?: AssetOfferDTO;
  projectId?: number;
  targetPublicKey?: string | null;
  skillType?: SkillType;
};

const ChatPreview: FC<ChatPreviewProps> = ({
  chatTargetIdTypePair,
  chatImage,
  chatName,
  enquiryInformation,
  projectInformation,
  assetOfferInformation,
  projectId,
  targetPublicKey,
  skillType,
}) => {
  const theme = useTheme();

  const setCurrentChatData = useSetCurrentChatDataState();

  const database = useSQLiteContext();

  const [lastMessages, setLastMessages] =
    useLastMessagesByTargetAndChatTypeState(chatTargetIdTypePair);

  useEffect(() => {
    fetchMessages(database, chatTargetIdTypePair, 3)
      .then((fetchedMessages) => {
        setLastMessages(fetchedMessages);
      })
      .catch((error) => console.error("Error fetching messages:", error));
  }, [database]);

  const latestMessage = lastMessages?.[0];

  const lastMessageString = latestMessage?.content || "";

  let formattedDate = "";

  if (latestMessage?.date) {
    const date = parseISO(latestMessage.date);
    formattedDate = formatDistance(date, new Date(), { addSuffix: true });
  }

  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        flexDirection: "row",
        alignItems: "center",
        // borderTopColor: theme.colors.lightGray,
        // borderTopWidth: 1,
        borderBottomColor: theme.colors.lightGray,
        borderBottomWidth: 1,
      }}
      onPress={() => {
        setCurrentChatData({
          chatName,
          colors: [],
          chatTypeIdPair: chatTargetIdTypePair,
          assetOfferInformation,
          enquiryInformation,
          projectInformation,
          projectId,
          targetPublicKey,
          chatMembers: [
            {
              userId: chatTargetIdTypePair.chatTargetId,
              username: chatName,
            },
          ],
        });
        router.push("/main/chat");
      }}
    >
      {skillType !== undefined ? (
        <SkillIcon skillType={skillType} style={styles.image} />
      ) : (
        <Media uri={"https://picsum.photos/200/300"} style={styles.image} />
      )}
      <View
        style={{
          flexDirection: "column",
          flex: 1,
          paddingRight: 10,
          paddingLeft: 10,
          gap: 10,
          height: "80%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              ...theme.customFonts.primary.medium,
              fontSize: 18,
              color: theme.colors.black,
            }}
          >
            {chatName}
          </Text>
          <Text
            style={{
              ...theme.customFonts.primary.medium,
              fontSize: 15,
              color: theme.colors.darkGray,
            }}
          >
            {formattedDate}
          </Text>
        </View>
        <Text
          style={{
            ...theme.customFonts.primary.medium,
            fontSize: 14,
            color: theme.colors.darkGray,
          }}
        >
          {lastMessageString}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatPreview;

const styles = StyleSheet.create({
  container: {
    height: 88,
    gap: 5,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginBottom: 10,
  },
});
