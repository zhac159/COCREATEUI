import { StyleProp, View } from "react-native";
import { Image, ImageStyle } from "expo-image";
import React from "react";
import {
  TapGestureHandler,
  State,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { FontAwesome6 } from "@expo/vector-icons";
import { Video } from "expo-av";

type MediaProps = {
  onPress: () => void;
  uri: string;
  style: StyleProp<ImageStyle>;
  editMode?: boolean;
};

const Media: React.FC<MediaProps> = ({
  onPress,
  uri,
  style,
  editMode = false,
}) => {
  return (
    <>
        <TapGestureHandler
          onHandlerStateChange={({ nativeEvent }) => {
            if (nativeEvent.state === State.END) {
              console.log("tap");
              onPress();
            }
          }}
        >
          {uri?.endsWith(".mp4") || uri?.endsWith(".mov") ? (
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            >
              <Video
                source={{ uri }}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                shouldPlay
                isLooping
                style={style}
              />
            </View>
          ) : (
            <Image
              source={{
                uri: uri,
              }}
              children={
                editMode ? (
                  <View
                    style={{
                      position: "absolute",
                      pointerEvents: "none",
                      backgroundColor: "white",
                      opacity: 0.5,
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    <FontAwesome6 name="image" size={30} color="black" />
                  </View>
                ) : null
              }
              style={style}
            />
          )}
        </TapGestureHandler>
    </>
  );
};

export default Media;
