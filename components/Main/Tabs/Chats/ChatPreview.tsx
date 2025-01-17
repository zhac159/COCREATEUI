import { FC } from "react";
import { StyleSheet } from "react-native";
import { Theme } from "@react-navigation/native";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import { ChatDTO } from "@/api/model";

type ChatPreviewProps = {
    chat: ChatDTO;
};

export const ChatPreview: FC<ChatPreviewProps> = ({chat}) => {
  const styles = useThemedStyles(getStyles);
  return <></>;
};

const getStyles = (theme: Theme) => StyleSheet.create({});
