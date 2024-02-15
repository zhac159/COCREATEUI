import { StyleProp, View } from "react-native";
import { Image, ImageStyle } from "expo-image";
import React from "react";
import { TapGestureHandler, State } from "react-native-gesture-handler";
import { FontAwesome6 } from "@expo/vector-icons";

type MediaProps = {
  onPress: () => void;
  uri: string;
  style: StyleProp<ImageStyle>;
  editMode?: boolean;
};

const Media: React.FC<MediaProps> = ({ onPress, uri, style, editMode = false }) => {
  return (
    <>
      <TapGestureHandler
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.END) {
            onPress();
          }
        }}
      >
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
      </TapGestureHandler>
    </>
  );
};

export default Media;
