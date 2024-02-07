import { Dimensions, ScrollView, View } from "react-native";
import React from "react";
import { usePutApiUserSkills } from "@/common/api/endpoints/cocreateApi";
import Asset from "./Asset";
import { Button, Text } from "react-native-paper";
import { useAssetsState } from "@/components/RecoilStates/profileState";
import Carousel from "react-native-snap-carousel";
import ImageViewer from "react-native-image-zoom-viewer";

const AssetTab = () => {
  const [assets, setAssets] = useAssetsState();

  if (!assets || assets.length === 0) {
    return (
      <View>
        <Text>No assets</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ height: "100%", width: "100%" }}
      contentContainerStyle={{ flex: 1, flexDirection: "row" }}
    >
      <Button style={{ flex: 1 }}>dsa</Button>
      <Carousel
        layout={"default"}
        data={assets}
        style={{ flex: 1 }}
        inactiveSlideShift={5}
        slideStyle={{ flex: 1 }}
        containerCustomStyle={{ flex: 1, paddingRight: 130 }}
        sliderWidth={Dimensions.get("window").width}
        loop={true}
        itemWidth={350}
        vertical={false}
        renderItem={({ item }) => item && <Asset asset={item} />}
      />
    </ScrollView>
  );
};

export default AssetTab;
