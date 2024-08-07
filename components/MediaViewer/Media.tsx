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
import { MediaDTO } from "@/common/api/model";

type MediaProps = {
  onPress?: () => void;
  uri: string | undefined | null;
  style: StyleProp<ViewStyle>;
  editMode?: boolean;
  media?: MediaDTO;
  backgroundColor?: string;
  mute?: boolean;
  loadingState?: number;
};

const Media: React.FC<MediaProps> = ({
  onPress,
  uri,
  media,
  style,
  editMode,
  mute = true,
  backgroundColor,
  loadingState,
}) => {
  const uriToUse = media?.uri ?? uri;

  const theme = useTheme();

  const [downloadingSate, setDownloadingState] = useState(false);

  const setMediaViewer = useSetMediaViewerState();

  onPress = onPress ? onPress : () => handleSelectMedia(uriToUse || "");

  const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded && status.isPlaying) {
      setDownloadingState(false);
    }
  };

  const handleSelectMedia = (uriToUse: string) => {
    setMediaViewer((state) => ({
      visible: false,
      selectedImageIndex: 0,
      uris: [uriToUse],
    }));
    router.push("/main/portofolioModal");
  };

  const isMediaVideo = useMemo(
    () => uriToUse?.endsWith(".mp4") || uriToUse?.endsWith(".mov"),
    [uriToUse]
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

  if (!uriToUse)
    return (
      <View
        style={{
          ...(style as {}),
          backgroundColor: backgroundColor ?? theme.colors.lightGray,
        }}
      >
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
              source={{ uri: uriToUse }}
              rate={1.0}
              volume={mute ? 0 : 1.0}
              isMuted={true}
              resizeMode={ResizeMode.COVER}
              videoStyle={{
                opacity: editMode ? 0.5 : 1,
              }}
              onLoadStart={() => setDownloadingState(true)}
              onLoad={handlePlaybackStatusUpdate}
              shouldPlay={true}
              isLooping
              style={{
                height: "100%",
                width: "100%",
              }}
            />
            {EditModeOverlay}
            {UploadingOverlay}
            {DownloadingOverlay}
          </View>
        ) : (
          <View style={[style, { overflow: "hidden" }]}>
            <Image
              source={{
                uri: uriToUse,
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
