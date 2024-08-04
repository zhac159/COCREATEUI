import { FC, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "../Themes/theme";
import { formatDistance, parseISO } from "date-fns";
import { router } from "expo-router";
import { useSetCurrentChatDataState } from "../RecoilStates/currentChatDataState";
import { ChatMember, ChatTypeIdPair } from "./chatHelper";
import { useSQLiteContext } from "expo-sqlite/next";
import { fetchMessages } from "@/common/database/databaseHelper";
import {
  AssetOfferDTO,
  EnquiryDTO,
  ProjectDTO,
  SkillType,
} from "@/common/api/model";
import SkillIcon from "../Account/Skills/SkillIcon";
import Media from "../MediaViewer/Media";
import ChatType from "@/common/chat/chatType";
import { useLastMessagesByChatIdState } from "../RecoilStates/lastMessagesState";

type ChatPreviewProps = {
  chatImage?: string;
  chatType: ChatType;
  chatId: string;
  chatName: string;
  chatMembers: ChatMember[];
  enquiryInformation?: EnquiryDTO;
  projectInformation?: ProjectDTO;
  assetOfferInformation?: AssetOfferDTO;
  skillType?: SkillType;
};

const ChatPreview: FC<ChatPreviewProps> = ({
  chatImage,
  chatType,
  chatId,
  chatName,
  chatMembers,
  enquiryInformation,
  projectInformation,
  assetOfferInformation,
  skillType,
}) => {
  const theme = useTheme();

  const setCurrentChatData = useSetCurrentChatDataState();

  const database = useSQLiteContext();

  const [lastMessages, setLastMessages] = useLastMessagesByChatIdState(chatId);

  useEffect(() => {
    fetchMessages(database, chatId, 3)
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
        backgroundColor: "transparent",
        gap: 10,
      }}
      onPress={() => {
        setCurrentChatData({
          chatId: chatId,
          chatMembers: chatMembers,
          chatName: chatName,
          chatType: chatType,
          colors: [],
          assetOfferInformation: assetOfferInformation,
          enquiryInformation: enquiryInformation,
          projectInformation: projectInformation,
        });
        router.push("/main/chat");
      }}
    >
      {skillType !== undefined ? (
        <SkillIcon skillType={skillType} style={styles.image} />
      ) : (
        // <Media uri={chatImage ?? "https://picsum.photos/200/300"} style={styles.image} />
        <View
          style={{ ...styles.image, backgroundColor: theme.colors.lightGray }}
        >
          <Text
            style={{
              color: theme.colors.black,
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            {chatName.substring(0, 2)}
          </Text>
        </View>
      )}
      <View
        style={{
          flex: 1,
          height: "90%",
          paddingBottom: "1%",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            flex: 1,
            paddingBottom: 8,
            borderBottomColor: theme.colors.lightGray,
            borderBottomWidth: 1,
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
                fontSize: 16,
                color: theme.colors.black,
              }}
            >
              {chatName}
            </Text>
            <Text
              style={{
                ...theme.customFonts.primary.medium,
                fontSize: 12,
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
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {lastMessageString}
          </Text>
        </View>
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
    width: 55,
    height: 55,
    borderRadius: 10,
    marginBottom: 10,
    pointerEvents: "none",
    alignItems: "center",
    justifyContent: "center",
  },
});
