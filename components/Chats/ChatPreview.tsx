import { FC, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "../Themes/theme";
import Media from "../MediaViewer/Media";
import { formatDistance, parseISO } from "date-fns";
import { router } from "expo-router";
import { useSetCurrentChatDataState } from "../RecoilStates/currentChatDataState";
import { ChatTypeIdPair } from "./chatHelper";
import { useLastMessagesByTargetAndChatTypeState } from "../RecoilStates/lastMessagesState";
import { useSQLiteContext } from "expo-sqlite/next";
import { fetchLastMessages } from "@/common/database/databaseHelper";
import { AssetOfferDTO, EnquiryDTO, ProjectDTO } from "@/common/api/model";

type ChatPreviewProps = {
  chatTargetIdTypePair: ChatTypeIdPair;
  chatImage: string;
  chatName: string;
  enquiryInformation?: EnquiryDTO;
  projectInformation?: ProjectDTO;
  assetOfferInformation?: AssetOfferDTO;
  projectId?: number;
};

const ChatPreview: FC<ChatPreviewProps> = ({
  chatTargetIdTypePair,
  chatImage,
  chatName,
  enquiryInformation,
  projectInformation,
  assetOfferInformation,
  projectId
}) => {
  const theme = useTheme();

  const setCurrentChatData = useSetCurrentChatDataState();

  const database = useSQLiteContext();

  const [lastMessages, setLastMessages] =
    useLastMessagesByTargetAndChatTypeState(chatTargetIdTypePair);

  useEffect(() => {
    fetchLastMessages(database, chatTargetIdTypePair)
      .then((fetchedMessages) => {
        console.log("Fetched messages:", fetchedMessages);
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
        borderBottomColor: theme.colors.gray,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
      }}
      onPress={() => {
        setCurrentChatData({
          chatName,
          colors: [],
          chatTypeIdPair: chatTargetIdTypePair,
          assetOfferInformation,
          enquiryInformation,
          projectInformation,
          projectId
        });
        router.push("/main/chat");
      }}
    >
      <View>
        <Media
          uri={"https://picsum.photos/200/300"}
          style={styles.image}
          onPress={() => {}}
        />
      </View>
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
    borderBottomWidth: 1,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
});
