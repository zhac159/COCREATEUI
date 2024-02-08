import { Dimensions, ScrollView, View } from "react-native";
import React, { useEffect } from "react";
import Asset from "./Asset";
import { Button, IconButton, Text } from "react-native-paper";
import { useAssetsState } from "@/components/RecoilStates/profileState";
import Carousel from "react-native-snap-carousel";
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import { AssetType } from "./assetHelper";
import { AssetDTO } from "@/common/api/model";

const AssetTab = () => {
  const [assets, setAssets] = useAssetsState();
  const [assetType, setAssetType] = React.useState(1);
  const [filteredAssets, setFilteredAssets] = React.useState<AssetDTO[]>(
    assets || []
  );
  const router = useRouter();
  useEffect(() => {
    setFilteredAssets(assets || []);
  }, [assets]);

  console.log("filteredAssets", assetType);
  return (
    <ScrollView
      style={{ height: "100%", width: "100%" }}
      contentContainerStyle={{
        flex: 1,
        flexDirection: "column",
        flexGrow: 1,
        height: "100%",
      }}
    >
      <IconButton
        icon="plus-circle"
        iconColor="white"
        style={{
          marginRight: 15,
          alignSelf: "flex-end",
          backgroundColor: "blue",
        }}
        size={17}
        onPress={() => {
          router.push({
            pathname: "/assetModal",
            params: { assetType: assetType.toString() },
          });
        }}
      />
      <View style={{ flex: 1, flexDirection: "row", flexGrow: 1 }}>
        <View style={{ paddingLeft: 20, paddingTop: 20 }}>
          {Object.keys(AssetType)
            .filter((key) => isNaN(Number(key))) // Filter out the numbers
            .map((skillGroup, index) => (
              <Button
                key={index}
                onPressIn={() => {
                  console.log("index", index);
                  setAssetType(index);
                  var newFilteredAssets = (assets || []).filter(
                    (asset) => asset.assetType === index
                  );
                  setFilteredAssets(newFilteredAssets);
                }}
                style={{
                  backgroundColor:
                    assetType ===
                    AssetType[skillGroup as keyof typeof AssetType]
                      ? "lightgreen"
                      : "white",
                }}
              >
                {skillGroup}
              </Button>
            ))}
        </View>
        <Carousel
          layout={"default"}
          key={JSON.stringify(filteredAssets)}
          useScrollView={true}
          shouldOptimizeUpdates={true}
          data={filteredAssets}
          style={{ flex: 1 }}
          inactiveSlideShift={5}
          slideStyle={{ flex: 1 }}
          containerCustomStyle={{ flex: 1, paddingRight: 130 }}
          sliderWidth={Dimensions.get("window").width}
          itemWidth={350}
          vertical={false}
          renderItem={({ item }) => item && <Asset asset={item} />}
        />
      </View>
    </ScrollView>
  );
};

export default AssetTab;
