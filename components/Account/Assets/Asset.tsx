import {
  AssetDTO,
  AssetUpdateDTO,
  MediaUpdateDTO,
  PrepareUploadDTO,
} from "@/common/api/model";
import { View } from "@/components/Themed";
import { Divider, Text } from "react-native-paper";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import React from "react";
import { useCacheImages } from "@/components/MediaViewer/mediaViewerHelper";
import { useSetMediaViewerState } from "@/components/MediaViewer/mediaViewerState";
import Media from "@/components/MediaViewer/Media";
import { useTheme } from "@/components/Themes/theme";
import {
  useDeleteApiAssetId,
  usePostApiPrepare,
  usePutApiAsset,
} from "@/common/api/endpoints/cocreateApi";
import {
  useSetAssetByIdState,
  useSetAssetsState,
} from "@/components/RecoilStates/profileState";
import { EntityType } from "../Common/Media/EntityType";
import { MediaType } from "../Common/Media/MediaType";
import {
  getCleanUrl,
  uploadFiles,
  useGetMedia,
} from "../Common/Media/mediaHelper";
import { assetStyles } from "./assetHelper";
import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";

type AssetProps = {
  asset: AssetDTO;
  editMode?: boolean;
  setUpdate: React.Dispatch<React.SetStateAction<() => void>>;
};

const Asset: React.FC<AssetProps> = ({
  asset,
  editMode = false,
  setUpdate,
}) => {
  const cacheImages = useCacheImages();
  const setMediaViewer = useSetMediaViewerState();
  const setAsset = useSetAssetByIdState(asset.id || 0);
  const setAssets = useSetAssetsState();
  const theme = useTheme();

  const [updatedUris, setUpdatedUris] = useState<string[]>([]);
  const [name, setName] = useState<string>(asset.name || "");
  const [description, setDescription] = useState<string>(
    asset.description || ""
  );

  const getMedia = useGetMedia(setUpdatedUris, true);
  const [cachedUris, setCachedUris] = useState<string[]>([]);
  const fetchCachedUris = async (asset: AssetDTO) => {
    var uris = asset.medias?.map((media) => media.uri || "") || [];

    var result = await cacheImages(uris || []);

    setCachedUris(result);
  };

  const { mutate: updateAsset } = usePutApiAsset({
    mutation: {
      onSuccess: (data) => {
        setAsset(data);
        fetchCachedUris(data);
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

        let updatedMedias: MediaUpdateDTO[] = [];

        for (let i = 0; i < 3; i++) {
          if (updatedUris[i] !== undefined && data.sasURIs) {
            const cleanUrl = getCleanUrl(data.sasURIs[currentUpdatedUri] || "");
            cacheImages([cleanUrl]);
            let updatedMedia: MediaUpdateDTO = {
              uri: cleanUrl,
              mediaType: MediaType.IMAGE,
            };

            if (asset.medias && asset.medias[i]) {
              updatedMedia.id = asset.medias[i].id;
              updatedMedia.mediaType = asset.medias[i].mediaType;
            }
            currentUpdatedUri++;
            updatedMedias.push(updatedMedia);
          } else if (asset.medias && asset.medias[i]) {
            updatedMedias.push(asset.medias[i]);
          }
        }

        const updatedAsset: AssetUpdateDTO = {
          id: asset.id,
          medias: updatedMedias,
          name: name,
          description: description,
        };

        updateAsset({ data: updatedAsset });
      },
    },
  });

  const { mutate: delteAsset } = useDeleteApiAssetId({
    mutation: {
      onSuccess: (data) => {
        setAssets((state) =>
          state ? state.filter((a) => a.id !== asset.id) : []
        );
      },
    },
  });

  const handleUpdate = () => {
    if (updatedUris.length === 0) {
      const updatedAsset: AssetUpdateDTO = {
        id: asset.id,
        name: name,
        description: description,
      };
      console.log(updatedAsset);
      updateAsset({ data: updatedAsset });
    } else {
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
    }
  };

  const handlePress = (index: number) => {
    if (editMode) {
      getMedia(index);
      return;
    }
    const combinedUris = cachedUris.map((uri, i) => updatedUris[i] || uri);

    setMediaViewer((state) => ({
      visible: false,
      selectedImageIndex: index,
      uris: combinedUris,
    }));

    router.push("/main/portofolioModal");
  };

  useEffect(() => {
    fetchCachedUris(asset);
  }, [asset.medias, cacheImages]);

  useEffect(() => {
    setUpdate(() => handleUpdate);
  }, [updatedUris, name, description]);

  return (
    <View
      style={{
        ...assetStyles.container,
        backgroundColor: editMode ? theme.colors.lightGray : theme.colors.white,
      }}
    >
      <Media
        onPress={() => handlePress(0)}
        uri={updatedUris[0] || cachedUris[0]}
        style={assetStyles.mainImage}
        editMode={editMode}
      />
      <View style={assetStyles.smallImagesContainer}>
        <Media
          onPress={() => handlePress(1)}
          uri={updatedUris[1] || cachedUris[1]}
          style={assetStyles.smallImage}
          editMode={editMode}
        />
        <Media
          onPress={() => handlePress(2)}
          uri={updatedUris[2] || cachedUris[2]}
          style={assetStyles.smallerImage}
          editMode={editMode}
        />
      </View>
      <View
        style={{
          backgroundColor: "transparent",
          height: "100%",
        }}
      >
        {editMode ? (
          <TextInput
            style={{
              ...theme.customFonts.primary.medium,
              ...assetStyles.titleTextInput,
              color: theme.colors.black,
              backgroundColor: theme.colors.lightestGray,
            }}
            value={name}
            onChangeText={(text) => {
              if (text.length <= 30) {
                setName(text);
              }
            }}
          />
        ) : (
          <Text
            style={{
              ...theme.customFonts.primary.medium,
              ...assetStyles.title,
              color: theme.colors.black,
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {name}
          </Text>
        )}
        <Divider
          style={{
            backgroundColor: editMode ? theme.colors.black : "transparent",
            height: 1,
          }}
        />

        {editMode ? (
          <TextInput
            style={{
              ...theme.customFonts.primary.small,
              ...assetStyles.descriptionTextInput,
              backgroundColor: theme.colors.lightestGray,
              color: theme.colors.black,
            }}
            multiline={true}
            value={description}
            onChangeText={setDescription}
          />
        ) : (
          <Text
            style={{
              ...theme.customFonts.primary.small,
              ...assetStyles.description,
              color: theme.colors.black,
            }}
            numberOfLines={5}
            ellipsizeMode="tail"
          >
            {description}
          </Text>
        )}
      </View>
      {editMode && (
        <TouchableOpacity
          style={assetStyles.deleteIconButton}
          onPress={() => delteAsset({ id: asset.id || 0 })}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <FontAwesome6 name="minus" size={15} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Asset;
