import { AssetDTO } from "@/common/api/model";
import { View } from "@/components/Themed";
import {
  ActivityIndicator,
  Modal,
  Portal,
  Surface,
  Text,
} from "react-native-paper";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { Image } from "expo-image";
import React from "react";
import ImageViewer from "react-native-image-zoom-viewer";
import { CacheManager } from "react-native-expo-image-cache";
import {
  TapGestureHandler,
  State,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { BlurView } from "expo-blur";

type AssetProps = {
  asset: AssetDTO;
};

const Asset: React.FC<AssetProps> = ({ asset }) => {
  const [visible, setVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [cachedImages, setCachedImages] = useState<string[]>([]);

  const handlePress = (index: number) => {
    setVisible(true);
    setSelectedImageIndex(index);
  };

  useEffect(() => {
    const cacheImages = async () => {
      const paths = await Promise.all(
        asset.uris?.map(async (uri) => {
          const path = await CacheManager.get(uri, {}).getPath();
          return path || "";
        }) || []
      );
      setCachedImages(paths);
    };

    cacheImages();
  }, [asset.uris]);

  const images = cachedImages.map((url) => ({ url }));

  return (
    <GestureHandlerRootView style={styles.gestureHandlerRootView}>
      <View
        style={{
          flex: 1,
          width: "65%",
          borderRadius: 15,
          overflow: "hidden",
        }}
      >
        <BlurView style={styles.container} intensity={100} experimentalBlurMethod="dimezisBlurView" >
          <Text style={styles.title}>{asset.name}</Text>
          {asset.uris && asset.uris.length > 0 && (
            <TapGestureHandler
              onHandlerStateChange={({ nativeEvent }) => {
                if (nativeEvent.state === State.END) {
                  handlePress(0);
                }
              }}
            >
              <Image
                source={{
                  uri: cachedImages[0],
                }}
                style={styles.smallImage}
              />
            </TapGestureHandler>
          )}
          <View style={styles.descriptionContainer}>
            <View style={styles.imageContainer}>
              {asset.uris && asset.uris.length > 1 && (
                <TapGestureHandler
                  onHandlerStateChange={({ nativeEvent }) => {
                    if (nativeEvent.state === State.END) {
                      handlePress(1);
                    }
                  }}
                >
                  <Image
                    source={{
                      uri: cachedImages[1],
                    }}
                    style={styles.smallImage}
                  />
                </TapGestureHandler>
              )}
              {asset.uris && asset.uris.length > 2 && (
                <TapGestureHandler
                  onHandlerStateChange={({ nativeEvent }) => {
                    if (nativeEvent.state === State.END) {
                      handlePress(2);
                    }
                  }}
                >
                  <Image
                    source={{
                      uri: cachedImages[2],
                    }}
                    style={styles.smallImage}
                  />
                </TapGestureHandler>
              )}
            </View>
            <Text style={styles.description}>{asset.name}</Text>
          </View>
        </BlurView>
      </View>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(!visible)}
          contentContainerStyle={styles.modal}
        >
          {asset && asset.uris && (
            <Surface style={styles.surface}>
              {isLoading && (
                <ActivityIndicator
                  size="large"
                  color="#0000ff"
                  style={styles.loadingIndicator}
                />
              )}
              <ImageViewer
                imageUrls={images}
                index={selectedImageIndex}
                enablePreload
                loadingRender={() => <ActivityIndicator />}
              />
            </Surface>
          )}
        </Modal>
      </Portal>
    </GestureHandlerRootView>
  );
};

export default Asset;

const styles = StyleSheet.create({
  gestureHandlerRootView: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    borderRadius: 15,
    padding: 10,
  },
  mainImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    borderRadius: 12,
  },
  loadingIndicator: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    flexDirection: "row",
    backgroundColor: "transparent",
    height: "40%",
    marginTop: 10,
    gap: 3,
  },
  smallImage: {
    flex: 1,
    flexShrink: 1,
    flexGrow: 1,
    backgroundColor: "transparent",
    borderRadius: 12,
  },
  smallerImage: {
    flex: 1,
    flexShrink: 1,
    flexGrow: 1,
    backgroundColor: "transparent",
    borderRadius: 12,
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 20,
    paddingBottom: 5,
  },
  descriptionContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "column",
    gap: 3,
  },
  description: {
    color: "white",
    fontSize: 10,
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    height: "60%",
    justifyContent: "center",
    zIndex: 100,
  },
  surface: {
    height: "100%",
    width: "100%",
    flex: 1,
    elevation: 1,
    flexGrow: 1,
  },
  zoomedImage: {
    width: "100%",
    height: "100%",
  },
});
