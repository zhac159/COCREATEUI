import { StyleProp, TouchableOpacity, View, ViewStyle } from "react-native";
import { Image } from "expo-image";
import React from "react";
import { TapGestureHandler, State } from "react-native-gesture-handler";
import { FontAwesome6 } from "@expo/vector-icons";
import { Video } from "expo-av";
import { addOpactity, useTheme } from "../Themes/theme";
import { useSetMediaViewerState } from "./mediaViewerState";
import { router } from "expo-router";

type MediaProps = {
  onPress?: () => void;
  uri: string | undefined | null;
  style: StyleProp<ViewStyle>;
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

  const setMediaViewer = useSetMediaViewerState();

  const handleSelectMedia = (uri: string) => {
    setMediaViewer((state) => ({
      visible: false,
      selectedImageIndex: 0,
      uris: [uri],
    }));

    router.push("/main/portofolioModal");
  };

  if (!onPress) onPress = () => handleSelectMedia(uri || "");

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
                  <FontAwesome6
                    name="image"
                    size={30}
                    color={theme.colors.white}
                  />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        ) : (
          <View style={[style, { overflow: "hidden" }]}>
            {uri ? (
              <Image
                source={{
                  uri: uri,
                }}
                contentFit="cover"
                style={{
                  height: "100%",
                  width: "100%",
                }}
              />
            ) : (
              <View
                style={{
                  height: "100%",
                  width: "100%",
                  backgroundColor: theme.colors.lightGray,
                }}
              />
            )}
            {editMode ? (
              <View
                style={{
                  position: "absolute",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  width: "100%",
                  backgroundColor: addOpactity(theme.colors.lightGray, 0.5),
                }}
              >
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    backgroundColor: theme.colors.grayer,
                    borderRadius: 50,
                    padding: 13,
                  }}
                  onPress={() => {
                    onPress();
                  }}
                >
                  <FontAwesome6
                    name="image"
                    size={30}
                    color={theme.colors.white}
                  />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        )}
      </TapGestureHandler>
    </>
  );
};

export default Media;
