import { FC } from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { Theme } from "@react-navigation/native";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import StyledText from "@/common/components/StyledComponents/StyledText";
import { ProfilePicture } from "@/common/components/ProfilePicture";
import { generalPadding } from "@/common/constants/generalPadding";
import { StyledTouchableOpacity } from "@/common/components/StyledComponents/StyledTouchableOpacity";
import { useSymmetricKey } from "@/common/contexts/SymmetricKeyProvider";
import { useMessagesStore } from "@/common/stores/messagesStore";
import { ChatDTO } from "@/api/model";

type ChatPreviewProps = ViewProps & {
  chat: ChatDTO;
};

export const ChatPreview: FC<ChatPreviewProps> = ({
  chat,
  style,
  ...props
}) => {
  const { navigateToChat } = useSymmetricKey();
  const styles = useThemedStyles(getStyles);
  const profilePicture = "https://i.pravatar.cc/300";

  const lastMessage = useMessagesStore((state) =>
    state.getLastChatMessages(chat.id)
  );

  return (
    <StyledTouchableOpacity
      style={[styles.container, style]}
      onPress={() => navigateToChat(chat)}
      {...props}
    >
      <ProfilePicture uri={profilePicture} style={styles.profilePicture} />
      <View style={styles.nameAndMessage}>
        <StyledText text={"chat.groupChatName"} secondary style={styles.name} />
        {lastMessage && lastMessage.content && (
          <StyledText
            text={lastMessage.content}
            style={styles.message}
            numberOfLines={2}
          />
        )}
      </View>
    </StyledTouchableOpacity>
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      backgroundColor: theme.colors.white,
      marginHorizontal: `-${generalPadding}`,
      paddingHorizontal: generalPadding,
      paddingVertical: 5,
      gap: 10,
      height: 70,
    },
    nameAndMessage: {
      height: "100%",
      width: "65%",
      gap: 5,
    },
    name: {
      fontWeight: "400",
    },
    message: {
      color: theme.colors.greyText,
      fontSize: 13,
    },
    profilePicture: {
      height: "90%",
      alignSelf: "center",
    },
  });
