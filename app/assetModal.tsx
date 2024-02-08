import { Keyboard, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "@/components/Themed";
import NewPortofolioContentModal from "@/components/Account/PortofolioContents/NewPortofolioContentModal";
import NewAssetForm from "@/components/Account/Assets/NewAssetForm";
import { AssetType } from "@/common/api/model";

function getAssetType(assetType: string | string[]): AssetType | undefined {
  if (Array.isArray(assetType)) {
    return undefined;
  }
  const assetTypeNumber = Number(assetType);
  if (!isNaN(assetTypeNumber)) {
    const assetTypeKey = `NUMBER_${assetTypeNumber}` as keyof typeof AssetType;
    return AssetType[assetTypeKey];
  }
  return undefined;
}

export default function AssetModal() {
  const { assetType } = useLocalSearchParams();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <NewAssetForm assetType={getAssetType(assetType)} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
