import { EnquiryDTO } from "@/common/api/model";
import { FC } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "../Themes/theme";
import Media from "../MediaViewer/Media";
import { formatDistance, parseISO } from "date-fns";
import {
  router,
} from "expo-router";
import { useSetCurrentChatIdState } from "../RecoilStates/currentChatIdState";

type EnquiryChatPreviewProps = {
  enquiry: EnquiryDTO;
  enquirer: boolean;
};

const EnquiryChatPreview: FC<EnquiryChatPreviewProps> = ({
  enquiry,
  enquirer,
}) => {
  const theme = useTheme();

  const setChatId = useSetCurrentChatIdState();

  const latestMessage = enquiry.messages
    ?.slice()
    .sort(
      (a, b) =>
        new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
    )[0];

  const lastMessageString = latestMessage?.message || "";

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
        setChatId(enquiry.id || 0);
        router.push("/enquiryChat");
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
            {!enquirer
              ? enquiry.enquirer?.username
              : enquiry.projectManager?.username}
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

export default EnquiryChatPreview;

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
