import { Dimensions, View } from "react-native";
import React, { useEffect, useState } from "react";
import Asset from "./Asset";
import { useAssetsValue } from "@/components/RecoilStates/profileState";
import Carousel from "react-native-snap-carousel";
import { AssetDTO } from "@/common/api/model";
import TabHeaderButtons from "../Common/TabHeaderButtons";
import AssetTypeSelector from "./AssetTypeSelector";
import NewAsset from "./NewAsset";
import { windowWidth } from "../Common/getWindowDimensions";

const AssetTab = () => {
  const assets = useAssetsValue();
  const assetsLength = assets?.length || 0;

  const [assetType, setAssetType] = React.useState(0);
  const [filteredAssets, setFilteredAssets] = React.useState<AssetDTO[]>(
    assets || []
  );
  const [editMode, setEditMode] = useState(false);
  const [createMode, setCreateMode] = useState(false);

  const [update, setUpdate] = useState<() => void>(() => console.log("update"));
  const [create, setCreate] = useState<() => void>(() => null);

  useEffect(() => {
    var newFilteredAssets = (assets || []).filter(
      (asset) => asset.assetType === assetType
    );
    setFilteredAssets(newFilteredAssets);
  }, [assetType, assetsLength]);

  return (
    <>
      <TabHeaderButtons
        editMode={editMode}
        setEditMode={setEditMode}
        disableEditMode={filteredAssets.length === 0}
        createMode={createMode}
        setCreateMode={setCreateMode}
        onDone={() => (createMode ? create() : update())}
      />
      <View style={{ flexDirection: "row", height: "100%" }}>
        <AssetTypeSelector
          assetType={assetType}
          setAssetType={setAssetType}
          disabled={editMode || createMode}
        />

        {createMode ? (
          <View
            style={{
              height: "100%",
              width: "100%",
              paddingLeft: 11,
              paddingTop: 10,
              paddingBottom: 10,
            }}
          >
            <NewAsset
              assetType={assetType}
              setCreate={setCreate}
              setCreateMode={setCreateMode}
            />
          </View>
        ) : (
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
            sliderWidth={windowWidth / 2}
            itemWidth={windowWidth / 1.09}
            vertical={false}
            renderItem={({ item }) =>
              item && (
                <Asset asset={item} editMode={editMode} setUpdate={setUpdate} />
              )
            }
          />
        )}
      </View>
    </>
  );
};

export default AssetTab;
