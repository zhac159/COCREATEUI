import { useChat } from "@/common/contexts/ChatProvider";
import { ChatInput } from "@/components/Chat/ChatInput";
import {
  chatAnimatedStyles,
  useChatAnimatedStyles,
} from "@/components/Chat/hooks/useChatAnimatedStyles";
import { View } from "react-native";
import Animated from "react-native-reanimated";

export default function Index() {
  const { chat, symmetricKey } = useChat();
  const { fakeView, scrollViewStyle, textInputStyle } = useChatAnimatedStyles();
  
  return (
    <View style={chatAnimatedStyles.container}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        style={scrollViewStyle}
      >
        <View style={chatAnimatedStyles.inverted}>
          <Animated.View style={fakeView} />
          {[...Array(100).keys()].map((i) => (
            <View
              key={i}
              style={{
                height: 50,
                marginVertical: 10,
                width: "90%",
                backgroundColor: i % 2 === 0 ? "red" : "blue",
              }}
            />
          ))}
        </View>
      </Animated.ScrollView>
      <Animated.View style={textInputStyle}>
        <ChatInput />
      </Animated.View>
    </View>
  );
}
