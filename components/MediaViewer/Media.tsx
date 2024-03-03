import { StyleProp, TouchableOpacity, View } from "react-native";
import { Image, ImageStyle } from "expo-image";
import React from "react";
import { TapGestureHandler, State } from "react-native-gesture-handler";
import { FontAwesome6 } from "@expo/vector-icons";
import { Video } from "expo-av";
import { useTheme } from "../Themes/theme";

type MediaProps = {
  onPress: () => void;
  uri: string;
  style: StyleProp<ImageStyle>;
  editMode?: boolean;
  backgroundColor?: string;
};

const Media: React.FC<MediaProps> = ({
  onPress,
  uri,
  style,
  editMode = false,
  backgroundColor,
}) => {
  const theme = useTheme();
  return (
    <>
      <TapGestureHandler
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.END && !editMode) {
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
              videoStyle={{
                opacity: editMode ? 0.5 : 1,
              }}
              shouldPlay
              isLooping
              style={style}
            />
            {editMode ? (
              <View
                style={{
                  position: "absolute",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  width: "100%",
                  backgroundColor: backgroundColor || theme.colors.lightGray,
                }}
              >
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: theme.colors.grayer,
                    borderRadius: 50,
                    padding: 13,
                  }}
                  onPress={() => {
                    onPress();
                  }}
                >
                  <FontAwesome6 name="image" size={30} color={theme.colors.white} />
                </TouchableOpacity>
              </View>
            ) : null}
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
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  width: "100%",
                  backgroundColor: backgroundColor || theme.colors.lightGray,
                }}
              >
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: theme.colors.grayer,
                    borderRadius: 50,
                    padding: 13,
                  }}
                  onPress={() => {
                    onPress();
                  }}
                >
                  <FontAwesome6 name="image" size={30} color={theme.colors.white} />
                </TouchableOpacity>
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
