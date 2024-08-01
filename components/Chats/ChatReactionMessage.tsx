import React, { useState } from "react";
import { IconButton } from "react-native-paper";
import { useTheme } from "../Themes/theme";
import { MessageCreateDTO, MessageDTO } from "@/common/api/model";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Emoji, emojiAnimations } from "@/assets/emojis/emojisHelper";
import LottieView from "lottie-react-native";
import MessageReaction from "../Common/Messages/MessageReaction";
import Message from "../Common/Messages/Message";

type ChatReactionMessageProps = {
  message?: Message;
  onSendMessage: (message: MessageCreateDTO) => void;
  renderItem: ({
    item,
    showReactions,
  }: {
    item: Message;
    showReactions: boolean;
  }) => React.JSX.Element;
  addReaction: (message: MessageReaction) => void;
};

const ChatReactionMessage: React.FC<ChatReactionMessageProps> = ({
  message,
  onSendMessage,
  renderItem,
  addReaction,
}) => {

  const theme = useTheme();

  const [multiplier, setMultiplier] = useState(1);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  const lastEmojis = [
    Emoji.Skull,
    Emoji.HoldingBackTears,
    Emoji.SeeNoEvilMonkey,
    Emoji.LoudlyCrying,
    Emoji.WinkyTongue,
  ];

  if (!message) return null;

  const handleLongPress = (emoji: Emoji) => {
    setMultiplier(1);
    const id = setInterval(() => {
      setMultiplier((prevMultiplier) => prevMultiplier + 1);
    }, 1000);
    setTimerId(id);
  };

  const handlePressOut = (emoji: Emoji) => {
    if (timerId) {
      clearInterval(timerId);
      setTimerId(null);
    }
    addReaction({
      messageId: message.id!,
      reaction: emoji,
      multiplier,
    });
    setMultiplier(1);
  };

  return (
    <View>
      <View style={styles.container}>
        {multiplier > 1 && <Text
          style={{
            ...theme.customFonts.primary.small,
            fontSize: 10 + multiplier * 5,
          }}
        >{multiplier}</Text>}
        <View style={styles.emojiContainer}>
          {lastEmojis.map((emoji) => (
            <TouchableOpacity
              onLongPress={() => handleLongPress(emoji)}
              onPressOut={() => handlePressOut(emoji)}
              key={emoji}
            >
              <LottieView
                source={emojiAnimations[emoji]}
                autoPlay
                loop={false}
                style={styles.emoji}
                key={emoji}
              />
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ alignSelf: "flex-start" }}>
          {renderItem({ item: message, showReactions: false })}
        </View>
      </View>
    </View>
  );
};
export default ChatReactionMessage;

const styles = StyleSheet.create({
  inputContainer: {
    paddingBottom: 30,
    paddingTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  container: {
    position: "absolute",
    width: "100%",
    bottom: "100%",
    paddingHorizontal: 16,
    paddingBottom: 20,
    gap: 20,
    alignItems: "flex-start",
  },
  emojiContainer: {
    flexDirection: "row",
    gap: 15,
  },
  emoji: {
    width: 35,
    height: 35,
  },
});
