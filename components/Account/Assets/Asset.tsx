import {
  AssetDTO,
  AssetUpdateDTO,
  PostApiAssetBody,
  PutApiAssetBody,
} from "@/common/api/model";
import { View } from "@/components/Themed";
import { Button, Text } from "react-native-paper";
import { StyleSheet } from "react-native";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import React from "react";
import { useCacheImages } from "@/components/MediaViewer/mediaViewerHelper";
import { useSetMediaViewerState } from "@/components/MediaViewer/mediaViewerState";
import Media from "@/components/MediaViewer/Media";
import { useTheme } from "@/components/Themes/theme";
import {
  usePostApiAsset,
  usePutApiAsset,
} from "@/common/api/endpoints/cocreateApi";
import * as ImagePicker from "expo-image-picker";
import { useSetAssetsState } from "@/components/RecoilStates/profileState";
import { SetterOrUpdater } from "recoil";

const updatePhoto = async (
  index: number,
  setUpdatedUris: Dispatch<SetStateAction<string[]>>
) => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  setUpdatedUris((old) => {
    const newUris = [...old];
    if (!result.canceled) {
      newUris[index] = result.assets[0].uri;
    }
    return newUris;
  });
};

type AssetProps = {
  asset: AssetDTO;
  editMode?: boolean;
  update: boolean;
  setUpdate: Dispatch<SetStateAction<boolean>>;
};

const Asset: React.FC<AssetProps> = ({
  asset,
  editMode = false,
  update,
  setUpdate,
}) => {
  const cacheImages = useCacheImages();
  const setMediaViewer = useSetMediaViewerState();
  const theme = useTheme();
  const [cachedUris, setCachedUris] = useState<string[]>([]);
  const setAssets = useSetAssetsState();

  const [updatedUris, setUpdatedUris] = useState<string[]>([]);

  const { mutate: updateAsset } = usePutApiAsset({
    mutation: {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      },
    },
  });

  const handlePress = (index: number) => {
    if (editMode) {
      updatePhoto(index, setUpdatedUris);
      return;
    }
    setMediaViewer((state) => ({
      ...state,
      visible: true,
      selectedImageIndex: index,
      uris: cachedUris,
    }));
  };

  useEffect(() => {
    const fetchCachedUris = async () => {
      const result = await cacheImages(asset.uris || []);
      setCachedUris(result);
    };

    fetchCachedUris();
  }, [asset.uris, cacheImages]);

  // useEffect(() => {
  //   setUpdate(false);
  // }, [update]);

  return (
    <View style={{ ...styles.container, backgroundColor: theme.colors.white }}>
      <Button
        onPress={() => {
          const updatedFileSrc = asset.uris
            ? asset.uris.map((src, index) =>
                updatedUris[index] !== undefined
                  ? "placeholder"
                  : src.split("/").pop() || "default"
              )
            : [];

          const updateAssetData: PutApiAssetBody = {
            "AssetUpdateDTO.AssetType": asset.assetType,
            "AssetUpdateDTO.Cost": asset.cost,
            "AssetUpdateDTO.Description": "asset.descridsasption" || "",
            "AssetUpdateDTO.FileSrcs": updatedFileSrc,
            "AssetUpdateDTO.Id": asset.id,
            "AssetUpdateDTO.Name": asset.name || "",
            "MediaFiles": updatedUris.filter(
              (uri) => uri !== undefined
            ) as unknown as Blob[],
          };

          updateAsset({
            data: updateAssetData,
          });
        }}
      >
        dsa
      </Button>
      <Media
        onPress={() => handlePress(0)}
        uri={updatedUris[0] || cachedUris[0]}
        style={styles.mainImage}
        editMode={editMode}
      />
      <View style={styles.smallImagesContainer}>
        <Media
          onPress={() => handlePress(1)}
          uri={updatedUris[1] || cachedUris[1]}
          style={styles.smallImage}
          editMode={editMode}
        />
        <Media
          onPress={() => handlePress(2)}
          uri={updatedUris[2] || cachedUris[2]}
          style={styles.smallerImage}
          editMode={editMode}
        />
      </View>
      <View
        style={{
          backgroundColor: "transparent",
          height: "100%",
        }}
      >
        <Text
          style={{
            ...styles.title,
            ...theme.customFonts.primary.medium,
            fontSize: 16,
            color: theme.colors.black,
          }}
        >
          {asset.name}
        </Text>
        <Text
          style={{
            ...theme.customFonts.primary.small,
            fontSize: 12,
            color: theme.colors.black,
          }}
        >
          {asset.description}
        </Text>
      </View>
    </View>
  );
};

export default Asset;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "65%",
    height: "100%",
    borderRadius: 14,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  mainImage: {
    borderRadius: 7,
    height: "40%",
  },
  smallImagesContainer: {
    flexDirection: "row",
    backgroundColor: "transparent",
    height: "30%",
    marginTop: 4,
    gap: 4,
  },
  smallImage: {
    width: "53%",
    height: "100%",
    borderRadius: 7,
  },
  smallerImage: {
    height: "100%",
    width: "45%",
    borderRadius: 7,
  },
  title: {
    paddingBottom: 5,
    marginTop: "5%",
  },
});
