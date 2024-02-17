import {
  AssetDTO,
  AssetUpdateDTO,
  PostApiAssetBody,
  PrepareUploadDTO,
  PutApiAssetBody,
} from "@/common/api/model";
import { View } from "@/components/Themed";
import { Button, Text } from "react-native-paper";
import { StyleSheet } from "react-native";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import React from "react";
import { useCacheImages } from "@/components/MediaViewer/mediaViewerHelper";
import { useSetMediaViewerState } from "@/components/MediaViewer/mediaViewerState";
import Media from "@/components/MediaViewer/Media";
import { useTheme } from "@/components/Themes/theme";
import {
  usePostApiAsset,
  usePostApiPrepare,
  usePutApiAsset,
} from "@/common/api/endpoints/cocreateApi";
import * as ImagePicker from "expo-image-picker";
import {
  useSetAssetByIdState,
  useSetAssetsState,
} from "@/components/RecoilStates/profileState";
import { SetterOrUpdater } from "recoil";
import { EntityType } from "../Common/Medias/EntityType";
import { MediaType } from "../Common/Medias/MediaType";
import * as FileSystem from "expo-file-system";

const updatePhoto = async (
  index: number,
  setUpdatedUris: SetterOrUpdater<string[]>
) => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  setUpdatedUris((state) => {
    const newState = [...state];
    if (!result.canceled) {
      newState[index] = result.assets[0].uri;
    }
    return newState;
  });
};

const uploadFiles = async (sasUris: string[], files: string[]) => {
  for (let i = 0; i < sasUris.length; i++) {
    const sasUri = sasUris[i];
    const file = files[i];

    // Read the file data
    const fileData = await FileSystem.readAsStringAsync(file, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const response = await fetch(`data:image/jpeg;base64,${fileData}`);
    const blob = await response.blob();

    let azureResponse;
    let attempts = 0;
    const maxAttempts = 3;

    while (attempts < maxAttempts) {
      try {
        azureResponse = await fetch(sasUri, {
          method: "PUT",
          body: blob,
          headers: {
            "Content-Type": "image/jpeg",
            "x-ms-blob-type": "BlockBlob",
          },
        });

        if (azureResponse.ok) {
          break;
        }
      } catch (error) {
        console.error(`Attempt ${attempts + 1} failed with error: ${error}`);
      }

      attempts++;
      if (attempts < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, 2000)); // wait for 2 seconds before retrying
      }
    }
  }
};

type AssetProps = {
  asset: AssetDTO;
  editMode?: boolean;
  setUpdate: React.Dispatch<React.SetStateAction<() => void>>
};

const Asset: React.FC<AssetProps> = ({
  asset,
  editMode = false,
  setUpdate,
}) => {
  const cacheImages = useCacheImages();
  const setMediaViewer = useSetMediaViewerState();
  const setAsset = useSetAssetByIdState(asset.id || 0);
  const theme = useTheme();

  const fetchCachedUris = async (asset: AssetDTO) => {
    var uris = asset.medias?.map((media) => media.uri || "") || [];

    var result = await cacheImages(uris || []);

    setCachedUris(result);
  };


  const [cachedUris, setCachedUris] = useState<string[]>([]);
  const [updatedUris, setUpdatedUris] = useState<string[]>([]);

  const { mutate: updateAsset } = usePutApiAsset({
    mutation: {
      onSuccess: (data) => {
        setAsset(data);

        fetchCachedUris(data);

      },
      onError: (error) => {
        // console.log(error);
      },
    },
  });

  const { mutate: prepareDownlaod } = usePostApiPrepare({
    mutation: {
      onSuccess: (data) => {
        const filteredUpdatedUris = updatedUris.filter(
          (prepareUpload) => prepareUpload !== undefined
        );
        uploadFiles(data.sasURIs || [], filteredUpdatedUris);

        var currentUpdatedUri = 0;

        const updatedAsset: AssetUpdateDTO = {
          id: asset.id,
          medias: asset.medias?.map((media, index) => {
            if (updatedUris[index] !== undefined && data.sasURIs) {
              const url = new URL(data.sasURIs[currentUpdatedUri] || "");
              const cleanUrl = `${url.protocol}//${url.host}${url.pathname}`;
              cacheImages([cleanUrl]);
              const updatedMedia = {
                id: media.id,
                uri: cleanUrl,
                mediaType: media.mediaType,
              };
              currentUpdatedUri++;
              return updatedMedia;
            }
            return media;
          }),
        };


        updateAsset({ data: updatedAsset });
      },

    },
  });

  const handlePrepareUpload = () => {
    const prepareUploadSubmission: PrepareUploadDTO[] =
      updatedUris.map((uri: string | undefined) => {
        const prepareUpload: PrepareUploadDTO = {
          entity: EntityType.ASSET,
          mediaType: MediaType.IMAGE,
        };
        return prepareUpload;
      }) || [];

    const filteredPrepareUploadSubmissioin = prepareUploadSubmission.filter(
      (prepareUpload) => prepareUpload !== undefined
    );

    prepareDownlaod({ data: filteredPrepareUploadSubmissioin });
  };

  const handlePress = (index: number) => {
    if (editMode) {
      updatePhoto(index, setUpdatedUris);
      return;
    }

    const combinedUris = cachedUris.map((uri, i) => updatedUris[i] || uri);

    setMediaViewer((state) => ({
      ...state,
      visible: true,
      selectedImageIndex: index,
      uris: combinedUris,
    }));
  };

  useEffect(() => {
    fetchCachedUris(asset);
  }, [asset.medias, cacheImages]);

  useEffect(() => {
    setUpdate(() => handlePrepareUpload);
  }, [updatedUris]);


  return (
    <View style={{ ...styles.container, backgroundColor: theme.colors.white }}>
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
