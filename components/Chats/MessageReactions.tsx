import MessageReaction from "../Common/Messages/MessageReaction";
import { View, StyleSheet, Text } from "react-native";
import { FC, useMemo } from "react";
import LottieView from "lottie-react-native";
import { emojiAnimations } from "@/assets/emojis/emojisHelper";
import { useTheme } from "../Themes/theme";

type MessageReacitionProps = {
  reactions?: MessageReaction[];
};

const MessageReactions: FC<MessageReacitionProps> = ({ reactions }) => {
  const theme = useTheme();

  const groupedReactions = useMemo(() => {
    if (!reactions) return {};

    return reactions.reduce<Record<string, MessageReaction>>(
      (acc, reaction) => {
        if (!acc[reaction.reaction]) {
          acc[reaction.reaction] = { ...reaction };
        } else {
          acc[reaction.reaction].multiplier += reaction.multiplier;
        }
        return acc;
      },
      {}
    );
  }, [reactions]);

  return (
    <View style={styles.reactionsContainer}>
      {Object.values(groupedReactions).map((reaction) => (
        <View style={{ alignItems: "center" }} key={reaction.reaction}>
          <LottieView
            source={emojiAnimations[reaction.reaction]}
            autoPlay
            loop={false}
            style={{ width: 30, height: 30 }}
          />
          <Text
            style={{
              ...theme.customFonts.primary.small,
              fontSize: 10,
              fontWeight: "500",
            }}
          >
            {reaction.multiplier + "x"}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default MessageReactions;

const styles = StyleSheet.create({
  reactionsContainer: {
    flexDirection: "row",
    gap: 10,
  },
});
