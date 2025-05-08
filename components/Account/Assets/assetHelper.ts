import { StyleSheet } from "react-native";

export enum AssetType {
  Camera,
  Location,
  Props,
  Lights,
  Microphones,
  Instruments,
}

export enum AssetIconNames {
  Camera = "camera",
  Location = "map-marker",
  Props = "table",
  Lights = "lightbulb",
  Microphones = "microphone",
  Instruments = "guitar",
}

export const getAssetIcon = (assetType: AssetType): AssetIconNames => {
  switch (assetType) {
    case AssetType.Camera:
      return AssetIconNames.Camera;
    case AssetType.Location:
      return AssetIconNames.Location;
    case AssetType.Props:
      return AssetIconNames.Props;
    case AssetType.Lights:
      return AssetIconNames.Lights;
    case AssetType.Microphones:
      return AssetIconNames.Microphones;
    case AssetType.Instruments:
      return AssetIconNames.Instruments;
  }
};

export const assetStyles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "68%",
    height: 400,
    borderRadius: 14,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    // elevation: 5,
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    marginBottom: 10,
  },
  mainImage: {
    borderRadius: 7,
    height: "40%",
  },
  smallImagesContainer: {
    flexDirection: "row",
    backgroundColor: "transparent",
    height: "30%",
    marginTop: 4,
    gap: 4,
  },
  smallImage: {
    width: "53%",
    height: "100%",
    borderRadius: 7,
  },
  smallerImage: {
    height: "100%",
    width: "45%",
    borderRadius: 7,
  },
  title: {
    marginTop: "5%",
    fontSize: 16,
    paddingLeft: "2%",
    paddingTop: "1%",
    paddingBottom: 0,
    paddingRight: "2%",
  },
  titleTextInput: {
    fontSize: 16,
    marginTop: "5%",
    paddingLeft: "2%",
    paddingTop: "1%",
    paddingBottom: 0,
    paddingRight: "2%",
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },
  description: {
    fontSize: 12,
    backgroundColor: "transparent",
    height: "20%",
    paddingLeft: "2%",
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: "2%",
  },
  descriptionTextInput: {
    fontSize: 12,
    borderWidth: 0,
    padding: 0,
    margin: 0,
    paddingLeft: "2%",
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: "2%",
    height: "15%",
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
  },
  deleteIconButton: {
    position: "absolute",
    top: "-2%",
    right: "-3%",
    borderRadius: 50,
    padding: 5,
  },
});
