import { ActivityIndicator, Modal, Portal, Surface } from "react-native-paper";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import ImageViewer from "react-native-image-zoom-viewer";
import { useMediaViewerState } from "./mediaViewerState";
import { BlurView } from "expo-blur";
import { windowHeight } from "../Account/Common/getWindowDimensions";

const MediaViewerPortal = () => {
  const [mediaViewer, mediaViewerState] = useMediaViewerState();

  const images = mediaViewer.uris.map((uri) => ({ url: uri }));

  return (
    <Portal>
      <Modal
        visible={mediaViewer.visible}
        onDismiss={() => mediaViewerState({ ...mediaViewer, visible: false })}
        contentContainerStyle={styles.modal}
      >
        <TouchableOpacity
          onPress={() => mediaViewerState({ ...mediaViewer, visible: false })}
          style={{
            height: windowHeight + 500,
            width: "100%",
            position: "absolute",
            backgroundColor: "transparent",
          }}
          activeOpacity={1}
        >
          <BlurView
            style={{
              height: windowHeight + 500,
              width: "100%",
              position: "absolute",
            }}
          ></BlurView>
        </TouchableOpacity>
        <Surface style={styles.surface}>
          <ImageViewer
            imageUrls={images}
            index={mediaViewer.selectedImageIndex}
            enablePreload
            style={{ padding: 0, margin: 0 }}
            backgroundColor="transparent"
            loadingRender={() => <ActivityIndicator />}
          />
        </Surface>
      </Modal>
    </Portal>
  );
};

export default MediaViewerPortal;

const styles = StyleSheet.create({
  modal: {
    height: "60%",
    justifyContent: "center",
  },
  surface: {
    height: "100%",
    width: "100%",
    backgroundColor: "transparent",
    flex: 1,
    elevation: 1,
    flexGrow: 1,
  },
});
