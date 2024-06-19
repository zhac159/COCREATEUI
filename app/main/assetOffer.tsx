import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import {
  windowHeight,
  windowWidth,
} from "@/components/Account/Common/getWindowDimensions";
import { useInterestedAssetValue } from "@/components/RecoilStates/interestedAssetState";
import Media from "@/components/MediaViewer/Media";
import { MediaDTO } from "@/common/api/model";
import { useTheme } from "@/components/Themes/theme";
import ButtonWithIcon from "@/components/Common/ButtonWithIcon";
import AssetOfferForm from "@/components/AssetFinder/AssetOfferForm";

export default function AssetOffer() {
  const theme = useTheme();

  const interestedAsset = useInterestedAssetValue();

  const [showOfferForm, setShowOfferForm] = useState(false);

  const renderItem = ({ item }: { item: MediaDTO }) => {
    return (
      <Media
        uri={item.uri}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    );
  };

  if (!interestedAsset) {
    return null;
  }

  return (
    <View
      style={{
        flex: 1,
        height: "100%",
      }}
    >
      <Carousel
        width={windowWidth}
        vertical={false}
        loop={false}
        data={interestedAsset.asset.medias}
        renderItem={renderItem}
        height={windowHeight * 0.5}
        panGestureHandlerProps={{
          activeOffsetX: [-3, 3],
          failOffsetY: [-5, 5],
        }}
      />
      <View
        style={{
          paddingHorizontal: 23,
          paddingVertical: 20,
          gap: 10,
        }}
      >
        <Text
          style={{
            ...theme.customFonts.primary.medium,
            fontSize: 25,
          }}
        >
          {interestedAsset.asset.name}
        </Text>
        <Text
          style={{
            ...theme.customFonts.primary.medium,
            fontSize: 13,
          }}
        >
          {interestedAsset.asset.description}
        </Text>
        <ButtonWithIcon
          text="Finish project"
          icon="check"
          onPress={() => setShowOfferForm(true)}
        />
      </View>
      <AssetOfferForm
        asset={interestedAsset.asset}
        projectId={interestedAsset.projectId}
        show={showOfferForm}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
