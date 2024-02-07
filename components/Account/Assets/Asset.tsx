import { AssetDTO } from "@/common/api/model";
import { View } from "@/components/Themed";
import {
  ActivityIndicator,
  Modal,
  Portal,
  Surface,
  Text,
} from "react-native-paper";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";

type AssetProps = {
  asset: AssetDTO;
};

const Asset: React.FC<AssetProps> = ({ asset }) => {
  const [visible, setVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handlePress = (index: number) => {
    setVisible(true);
    setSelectedImageIndex(index);
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>{asset.name}</Text>
        {asset.uris && asset.uris.length > 0 && (
          <TouchableOpacity
            onPress={() => handlePress(0)}
            style={{ flex: 1, flexGrow: 1 }}
          >
            <Image source={{ uri: asset.uris[0] }} style={styles.mainImage} />
          </TouchableOpacity>
        )}
        <View style={styles.descriptionContainer}>
          <View style={styles.imageContainer}>
            {asset.uris && asset.uris.length > 1 && (
              <TouchableOpacity
                onPress={() => handlePress(1)}
                style={{ flex: 1, flexGrow: 1 }}
              >
                <Image
                  source={{ uri: asset.uris[1] }}
                  style={styles.smallImage}
                />
              </TouchableOpacity>
            )}
            {asset.uris && asset.uris.length > 2 && (
              <TouchableOpacity
                onPress={() => handlePress(2)}
                style={{ flex: 1, flexGrow: 1 }}
              >
                <Image
                  source={{ uri: asset.uris[2] }}
                  style={styles.smallerImage}
                />
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.description}>{asset.name}</Text>
        </View>
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
              <Image
                source={{ uri: asset.uris[selectedImageIndex] }}
                style={styles.zoomedImage}
                onLoadStart={() => setIsLoading(true)}
                onLoadEnd={() => setIsLoading(false)}
              />
            </Surface>
          )}
        </Modal>
      </Portal>
    </>
  );
};

export default Asset;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    width: "65%",
    height: "100%",
    backgroundColor: "black",
    borderRadius: 15,
    marginTop: 30,
    padding: 10,
    marginBottom: 10,
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
    backgroundColor: "black",
    borderRadius: 12,
  },
  smallerImage: {
    flex: 1,
    flexShrink: 1,
    flexGrow: 1,
    backgroundColor: "black",
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
    backgroundColor: "black",
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
