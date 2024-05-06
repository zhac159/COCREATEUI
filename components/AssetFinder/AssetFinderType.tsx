import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import {
  AssetType,
  getAssetIcon,
} from "@/components/Account/Assets/assetHelper";
import { useTheme } from "../Themes/theme";
import { FontAwesome6 } from "@expo/vector-icons";

type AssetFinderTypeProps = {
  assetType: AssetType;
  setSelectedAssetType: (type: AssetType) => void;
};

const AssetFinderType: React.FC<AssetFinderTypeProps> = ({
  assetType,
  setSelectedAssetType,
}) => {
  const theme = useTheme();

  const assetTypeString = useMemo(() => {
    return Object.keys(AssetType).find(
      (key) => AssetType[key as keyof typeof AssetType] === assetType
    );
  }, [assetType]);

  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        backgroundColor: theme.colors.lightBlue,
      }}
      onPress={() => setSelectedAssetType(assetType)}
    >
      <FontAwesome6
        name={getAssetIcon(assetType)}
        size={30}
        color={theme.colors.primary}
        solid
      />
      <Text
        style={{
          ...theme.customFonts.primary.medium,
          ...styles.name,
        }}
      >
        {assetTypeString}
      </Text>
    </TouchableOpacity>
  );
};

export default AssetFinderType;

const styles = StyleSheet.create({
  container: {
    height: 107,
    borderRadius: 7,
    width: "49%",
    paddingTop: 25,
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    alignSelf: "flex-start",
    bottom: 10,
    position: "absolute",
  },
});
