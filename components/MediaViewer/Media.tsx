import {
  ActivityIndicator,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Image } from "expo-image";
import React, { memo, useMemo, useState } from "react";
import { TapGestureHandler, State } from "react-native-gesture-handler";
import { FontAwesome6 } from "@expo/vector-icons";
import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import { addOpactity, useTheme } from "../Themes/theme";
import { useSetMediaViewerState } from "./mediaViewerState";
import { router } from "expo-router";
import * as Progress from "react-native-progress";

type MediaProps = {
  onPress?: () => void;
  uri: string | undefined | null;
  style: StyleProp<ViewStyle>;
  editMode?: boolean;
  backgroundColor?: string;
  mute?: boolean;
  loadingState?: number;
};

const Media: React.FC<MediaProps> = ({
  onPress,
  uri,
  style,
  editMode,
  mute = true,
  backgroundColor,
  loadingState,
}) => {
  const theme = useTheme();

  const [downloadingSate, setDownloadingState] = useState(false);

  const setMediaViewer = useSetMediaViewerState();

  onPress = onPress ? onPress : () => handleSelectMedia(uri || "");

  const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded && status.isPlaying) {
      setDownloadingState(false);
    }
  };

  const handleSelectMedia = (uri: string) => {
    setMediaViewer((state) => ({
      visible: false,
      selectedImageIndex: 0,
      uris: [uri],
    }));
    router.push("/main/portofolioModal");
  };

  const isMediaVideo = useMemo(
    () => uri?.endsWith(".mp4") || uri?.endsWith(".mov"),
    [uri]
  );

  const EditModeOverlay = useMemo(() => {
    if (!editMode || loadingState !== undefined) return null;

    return (
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
          <FontAwesome6 name="image" size={30} color={theme.colors.white} />
        </TouchableOpacity>
      </View>
    );
  }, [editMode, loadingState]);

  const DownloadingOverlay = useMemo(() => {
    if (!downloadingSate) return null;

    return (
      <View
        style={{
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
          backgroundColor: addOpactity(theme.colors.black, 0.5),
        }}
      >
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }, [downloadingSate]);

  const UploadingOverlay = useMemo(() => {
    if (loadingState === undefined) return null;

    return (
      <View
        style={{
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
          backgroundColor: addOpactity(theme.colors.black, 0.5),
        }}
      >
        <Progress.Circle
          size={50}
          progress={loadingState / 100}
          showsText={false}
          color={theme.colors.white}
        />
      </View>
    );
  }, [loadingState]);

  if (!uri)
    return (
      <View style={{ ...(style as {}), backgroundColor: backgroundColor ?? theme.colors.white }}>
        {EditModeOverlay}
      </View>
    );

  return (
    <>
      <TapGestureHandler
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.END && !editMode) {
            onPress();
          }
        }}
      >
        {isMediaVideo ? (
          <View style={[style, { overflow: "hidden" }]}>
            <Video
              source={{ uri }}
              rate={1.0}
              volume={mute ? 0 : 1.0}
              isMuted={false}
              resizeMode={ResizeMode.COVER}
              videoStyle={{
                opacity: editMode ? 0.5 : 1,
              }}
              onLoadStart={() => setDownloadingState(true)}
              onLoad={handlePlaybackStatusUpdate}
              shouldPlay = {false}
              isLooping
              style={{
                height: "100%",
                width: "100%",
              }}
            />
            {EditModeOverlay}
            {UploadingOverlay}
          </View>
        ) : (
          <View style={[style, { overflow: "hidden" }]}>
            <Image
              source={{
                uri: uri,
              }}
              onLoadStart={() => {
                setDownloadingState(true);
              }}
              onLoadEnd={() => {
                setDownloadingState(false);
              }}
              contentFit="cover"
              style={{
                height: "100%",
                width: "100%",
              }}
            />
            {EditModeOverlay}
            {UploadingOverlay}
            {DownloadingOverlay}
          </View>
        )}
      </TapGestureHandler>
    </>
  );
};

export default memo(Media);
