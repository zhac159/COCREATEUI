import React, { FC } from "react";
import { Text, StyleSheet, FlatList, View } from "react-native";
import { AssetDTO } from "@/common/api/model";
import FoundAsset from "./FoundAsset";

type FoundAssetsProps = {
  assets: AssetDTO[];
  projectId: number;
};

const FoundAssets: FC<FoundAssetsProps> = ({ assets, projectId }) => {
  return (
    <>
      {assets.map((asset) => (
        <View
          style={{
            height: 370,
            width: "100%",
          }}
        >
          <FoundAsset asset={asset} projectId={projectId} />
        </View>
      ))}
    </>
  );
};

export default FoundAssets;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
