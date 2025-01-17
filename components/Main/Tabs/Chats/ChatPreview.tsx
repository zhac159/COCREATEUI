import { FC } from "react";
import { StyleSheet, TouchableOpacity, View, ViewProps } from "react-native";
import { Theme } from "@react-navigation/native";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import { ChatPreviewInfo } from "@/common/types/ChatPreviewInfo";
import StyledText from "@/common/components/StyledComponents/StyledText";
import { ProfilePicture } from "@/common/components/ProfilePicture";
import { generalPadding } from "@/common/constants/generalPadding";
import { StyledTouchableOpacity } from "@/common/components/StyledComponents/StyledTouchableOpacity";

type ChatPreviewProps = ViewProps & {
  chat: ChatPreviewInfo;
};

export const ChatPreview: FC<ChatPreviewProps> = ({
  chat,
  style,
  ...props
}) => {
  const styles = useThemedStyles(getStyles);
  const profilePicture = "https://i.pravatar.cc/300";
  
  return (
    <StyledTouchableOpacity style={[styles.container, style]} {...props}>
      <ProfilePicture source={profilePicture} style={styles.profilePicture} />
      <View style={styles.nameAndMessage}>
        <StyledText text={chat.chatName} secondary style={styles.name} />
        <StyledText
          text={chat.lastMessage}
          style={styles.message}
          numberOfLines={2}
        />
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
