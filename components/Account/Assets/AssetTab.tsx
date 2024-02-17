import { Dimensions, View } from "react-native";
import React, { useEffect, useState } from "react";
import Asset from "./Asset";
import { useAssetsValue } from "@/components/RecoilStates/profileState";
import Carousel from "react-native-snap-carousel";
import { AssetDTO } from "@/common/api/model";
import TabHeaderButtons from "../Common/TabHeaderButtons";
import AssetTypeSelector from "./AssetTypeSelector";

const AssetTab = () => {
  const assets = useAssetsValue();

  const [assetType, setAssetType] = React.useState(0);
  const [filteredAssets, setFilteredAssets] = React.useState<AssetDTO[]>(
    assets || []
  );
  const [editMode, setEditMode] = useState(false);

  const [handleUpdate, setHandleUpdate] = useState();

  const [update, setUpdate] = useState<(() => void)>(() => null);

  useEffect(() => {
    var newFilteredAssets = (assets || []).filter(
      (asset) => asset.assetType === assetType
    );
    setFilteredAssets(newFilteredAssets);
  }, [assetType]);

  return (
    <>
      <TabHeaderButtons
        editMode={editMode}
        setEditMode={setEditMode}
        onDone={() => update()}
      />
      <View style={{ flexDirection: "row", height: "100%" }}>
        <AssetTypeSelector assetType={assetType} setAssetType={setAssetType} />
        <Carousel
          layout={"default"}
          key={JSON.stringify(filteredAssets)}
          useScrollView={true}
          scrollEnabled={!editMode}
          shouldOptimizeUpdates={true}
          data={filteredAssets}
          containerCustomStyle={{
            flex: 1,
            height: "100%",
            width: "100%",
            paddingLeft: 11,
            paddingTop: 10,
            paddingBottom: 10,
          }}
          sliderWidth={Dimensions.get("window").width / 2}
          itemWidth={Dimensions.get("window").width / 1.09}
          vertical={false}
          renderItem={({ item }) =>
            item && (
              <Asset
                asset={item}
                editMode={editMode}
                setUpdate={setUpdate}
              />
            )
          }
        />
      </View>
    </>
  );
};

export default AssetTab;
