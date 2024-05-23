import { MessageDTO, UserInformationDTO } from "@/common/api/model";
import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../Themes/theme";
import { formatDistance, parseISO } from "date-fns";
import { BlurView } from "expo-blur";
import { useUserIdValue } from "../RecoilStates/profileState";

type GroupChatPreviewMessagesProps = {
  message: MessageDTO;
  sender: UserInformationDTO | null;
};

const GroupChatPreviewMessages: FC<GroupChatPreviewMessagesProps> = ({
  message,
  sender,
}) => {
  const theme = useTheme();

  const userId = useUserIdValue();

  let formattedDate = "";

  if (message.date) {
    const date = parseISO(message.date);
    formattedDate = formatDistance(date, new Date(), { addSuffix: true });
  }

  return (
    <BlurView
     
      intensity={15}
      renderToHardwareTextureAndroid
      style={{
        ...styles.container,
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        alignSelf: userId === message.senderId ? "flex-end" : "flex-start",
      }}
    >
      <Text
        style={{
          ...theme.customFonts.primary.medium,
          fontSize: 13,
          color: theme.colors.white,
        }}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {
          message.content}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignSelf: "flex-end",
          gap: 10,
        }}
      >
        <Text
          style={{
            ...theme.customFonts.primary.medium,
            fontSize: 10,
            color: theme.colors.white,
          }}
        >
          {"test user"}
        </Text>
        <Text
          style={{
            ...theme.customFonts.primary.medium,
            fontSize: 10,
            color: theme.colors.white,
          }}
        >
          {formattedDate}
        </Text>
      </View>
    </BlurView>
  );
};

export default GroupChatPreviewMessages;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    maxWidth: "80%",
    padding: 10,
    gap: 4,
  },
});
