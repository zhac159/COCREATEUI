import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../Themes/theme";
import { AssetType } from "../Account/Assets/assetHelper";

type AssetFinderTitleProps = {
  assetType?: AssetType;
};

const AssetFinderTitle: FC<AssetFinderTitleProps> = ({ assetType }) => {
  const theme = useTheme();

  return (
    <Text
      style={{
        ...theme.customFonts.secondary.medium,
        ...styles.title,
      }}
    >
      {assetType !== undefined ? "Find " + AssetType[assetType] : "Find Tool And Assets"}
    </Text>
  );
};

export default AssetFinderTitle;

const styles = StyleSheet.create({
  title: {
    fontSize: 35,
    fontWeight: "400",
    alignSelf: "flex-start",
  },
});
