import {
  AssetCreateDTO,
  AssetDTO,
  AssetType,
  MediaCreateDTO,
  PrepareUploadDTO,
} from "@/common/api/model";
import { View } from "@/components/Themed";
import { TextInput } from "react-native";
import { useEffect, useState } from "react";
import React from "react";
import { useCacheImages } from "@/components/MediaViewer/mediaViewerHelper";
import { useSetMediaViewerState } from "@/components/MediaViewer/mediaViewerState";
import Media from "@/components/MediaViewer/Media";
import { useTheme } from "@/components/Themes/theme";
import {
  usePostApiAsset,
  usePostApiPrepare,
} from "@/common/api/endpoints/cocreateApi";
import { useSetAssetsState } from "@/components/RecoilStates/profileState";
import { EntityType } from "../Common/Media/EntityType";
import { MediaType } from "../Common/Media/MediaType";
import { uploadFiles, useGetMedia } from "../Common/Media/mediaHelper";
import { assetStyles } from "./assetHelper";
import { Divider } from "react-native-paper";

type NewAssetFormProps = {
  assetType: number;
  setCreate: React.Dispatch<React.SetStateAction<() => void>>;
  setCreateMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const NewAssetForm: React.FC<NewAssetFormProps> = ({
  setCreate,
  assetType,
  setCreateMode,
}) => {
  const setMediaViewer = useSetMediaViewerState();
  const theme = useTheme();

  const [uris, setUris] = useState<string[]>([]);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const getMedia = useGetMedia(setUris, true);
  const cacheImages = useCacheImages();
  const cacheUris = async (asset: AssetDTO) => {
    var uris = asset.medias?.map((media) => media.uri || "") || [];
    await cacheImages(uris || []);
  };
  const setAssets = useSetAssetsState();
  const { mutate: createAsset } = usePostApiAsset({
    mutation: {
      onSuccess: (data) => {
        setAssets((state) => {
          const newState = [...(state || [])];
          newState.push(data);
          return newState;
        });
        cacheUris(data);
        setCreateMode(false);
      },
    },
  });

  const { mutate: prepareDownlaod } = usePostApiPrepare({
    mutation: {
      onSuccess: (data) => {
        const sasURIs = data.sasURIs;

        if (sasURIs) {
          uploadFiles(data.sasURIs || [], uris);
          let newAssetMedias: MediaCreateDTO[] = [];
          newAssetMedias =
            uris.map((_, index) => {
              const url = new URL(sasURIs[index] || "");
              const cleanUrl = `${url.protocol}//${url.host}${url.pathname}`;
              const newMedia: MediaCreateDTO = {
                uri: cleanUrl,
                mediaType: MediaType.IMAGE,
              };
              return newMedia;
            }) || [];

          const NewAsset: AssetCreateDTO = {
            medias: newAssetMedias,
            name: name,
            description: description,
            assetType:
              AssetType[
                Object.keys(AssetType)[assetType] as keyof typeof AssetType
              ],
          };
          createAsset({ data: NewAsset });
        }
      },
    },
  });

  const handleCreate = () => {
    const prepareDownloadSubmission: PrepareUploadDTO[] =
      uris.map((uri: string) => {
        const prepareUpload: PrepareUploadDTO = {
          entity: EntityType.ASSET,
          mediaType: MediaType.IMAGE,
        };
        return prepareUpload;
      }) || [];
    prepareDownlaod({ data: prepareDownloadSubmission });
  };

  const handlePress = (index: number) => {
    getMedia(index);

    setMediaViewer((state) => ({
      ...state,
      selectedImageIndex: index,
      uris: uris,
    }));
  };

  useEffect(() => {
    setCreate(() => handleCreate);
  }, [uris, name, description]);

  return (
    <View
      style={{
        ...assetStyles.container,
        backgroundColor: theme.colors.lightGray,
      }}
    >
      <Media
        onPress={() => handlePress(0)}
        uri={uris[0]}
        style={assetStyles.mainImage}
        editMode={true}
      />
      <View style={assetStyles.smallImagesContainer}>
        <Media
          onPress={() => handlePress(1)}
          uri={uris[1]}
          style={assetStyles.smallImage}
          editMode={true}
        />
        <Media
          onPress={() => handlePress(2)}
          uri={uris[2]}
          style={assetStyles.smallerImage}
          editMode={true}
        />
      </View>
      <View
        style={{
          backgroundColor: "transparent",
          height: "100%",
        }}
      >
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
        <Divider
          style={{
            backgroundColor: theme.colors.black,
            height: 1,
          }}
        />

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
      </View>
    </View>
  );
};

export default NewAssetForm;
