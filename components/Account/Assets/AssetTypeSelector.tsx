import { Dispatch, FC, SetStateAction } from "react";
import { Dimensions, ScrollView, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import Asset from "./Asset";
import { Button, IconButton, Text } from "react-native-paper";
import { useAssetsState } from "@/components/RecoilStates/profileState";
import Carousel from "react-native-snap-carousel";
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import { AssetType } from "./assetHelper";
import { AssetDTO } from "@/common/api/model";
import TabHeaderButtons from "../Common/TabHeaderButtons";
import { useTheme } from "@/components/Themes/theme";

type AssetTypeSelectorProps = {
  assetType: number;
  setAssetType: Dispatch<SetStateAction<number>>;
};

const AssetTypeSelector: FC<AssetTypeSelectorProps> = ({
  assetType,
  setAssetType,
}) => {
  const theme = useTheme();

  return (
    <View>
      {Object.keys(AssetType)
        .filter((key) => isNaN(Number(key)))
        .map((skillGroup, index) => (
          <View style={{ alignSelf: "flex-start" }} key={index + "asset-types"}>
            <TouchableOpacity
              onPressIn={() => {
                setAssetType(index);
              }}
              style={{
                backgroundColor:
                  assetType === AssetType[skillGroup as keyof typeof AssetType]
                    ? theme.colors.black
                    : "transparent",
                marginTop: 10,
                paddingHorizontal: 11,
                paddingVertical: 5,
                borderRadius: 20,
              }}
            >
              <Text
                style={{
                  ...theme.customFonts.primary.medium,
                  color:
                    assetType ===
                    AssetType[skillGroup as keyof typeof AssetType]
                      ? theme.colors.white
                      : theme.colors.black,
                }}
              >
                {skillGroup}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
    </View>
  );
};

export default AssetTypeSelector;
