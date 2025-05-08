import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AssetType } from "@/components/Account/Assets/assetHelper";
import AssetFinderType from "./AssetFinderType";

type AssetFinderTypeSelectorProps = {
  setSelectedAssetType: (type: AssetType) => void;
  show: boolean;
};

const AssetFinderTypeSelector: React.FC<AssetFinderTypeSelectorProps> = ({
  setSelectedAssetType,
  show
}) => {

  if (!show) {
    return null;
  }

  return (
    <FlatList
      data={Object.keys(AssetType).filter((key) => isNaN(Number(key)))}
      renderItem={({ item: key }) => (
        <AssetFinderType
          key={key}
          assetType={AssetType[key as keyof typeof AssetType]}
          setSelectedAssetType={setSelectedAssetType}
        />
      )}
      contentContainerStyle={{ gap: 10 }}
      columnWrapperStyle={{ justifyContent: "space-between" }}
      keyExtractor={(key) => key}
      numColumns={2}
    />
  );
};

export default AssetFinderTypeSelector;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});
