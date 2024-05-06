import React, { FC } from "react";
import { Text, StyleSheet, View } from "react-native";
import { AssetDTO, MediaDTO } from "@/common/api/model";
import Carousel from "react-native-reanimated-carousel";
import { windowWidth } from "../Account/Common/getWindowDimensions";
import Media from "../MediaViewer/Media";
import { useTheme } from "../Themes/theme";
import { useSetInterestedAssetState } from "../RecoilStates/interestedAssetState";
import { router } from "expo-router";

type FoundAssetProps = {
  asset: AssetDTO;
  projectId: number;
};

const FoundAsset: FC<FoundAssetProps> = ({ asset, projectId }) => {
  const theme = useTheme();

  const setInterestedAsset = useSetInterestedAssetState();

  const renderItem = ({ item }: { item: MediaDTO }) => {
    return (
      <Media
        uri={item.uri}
        style={{
          width: "100%",
          height: 370,
          borderRadius: 10,
          position: "absolute",
          zIndex: -1,
        }}
        onPress={() => {
          setInterestedAsset({
            asset: asset,
            projectId: projectId,
          });
          router.navigate("/main/assetOffer");
        }}
      />
    );
  };

  return (
    <View
      style={{
        width: "100%",
        borderRadius: 10,
        height: 370,
      }}
    >
      <View
        style={{
          ...styles.name,
          paddingHorizontal: 25,
        }}
      >
        <Text
          style={{
            ...theme.customFonts.primary.medium,
            fontSize: 20,
            color: theme.colors.white,
          }}
        >
          {asset.name}
        </Text>
      </View>
      <Carousel
        width={windowWidth * 0.9}
        vertical={false}
        loop={false}
        data={asset.medias}
        renderItem={renderItem}
        height={370}
        panGestureHandlerProps={{
          activeOffsetX: [-3, 3],
          failOffsetY: [-5, 5],
        }}
      />
    </View>
  );
};

export default FoundAsset;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  name: {
    position: "absolute",
    zIndex: 100,
    bottom: 51,
    marginRight: 25,
    width: "100%",
  },
});
