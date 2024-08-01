import * as ImagePicker from "expo-image-picker";
import { useCallback, useEffect, useState } from "react";
import { SetterOrUpdater } from "recoil";
import { MediaType } from "./MediaType";
import { MediaCreateDTO } from "@/common/api/model";
import { SQLiteDatabase } from "expo-sqlite/next";
import { fetchUrisByChatTargetIdTypePair } from "@/common/database/databaseHelper";
import Upload, { UploadOptions } from "react-native-background-upload";
import { Platform } from "react-native";
import * as FileSystem from "expo-file-system";
import { get } from "lodash";
import { router } from "expo-router";
import { useSetMediaViewerState } from "@/components/MediaViewer/mediaViewerState";

const getContentType = (uri: string) => {
  if (uri.endsWith(".jpeg") || uri.endsWith(".jpg") || uri.endsWith(".png")) {
    return "image/jpeg";
  } else if (uri.endsWith(".mp4")) {
    return "video/mp4";
  } else if (uri.endsWith(".mov")) {
    return "video/mp4";
  }
  return "application/octet-stream";
};

export const uploadFiles = async (sasUris: string[], files: string[]) => {
  const uploadPromises = sasUris.map(async (sasUri, index) => {
    let file = files[index];

    if (Platform.OS === "android" && file.startsWith("file://")) {
      const contentUri = await FileSystem.getContentUriAsync(file);
      file = contentUri;
    }

    console.log(`Uploading ${file} to ${sasUri}`);

    const options: UploadOptions = {
      url: sasUri,
      path: file,
      method: "PUT",
      customUploadId: files[index],
      type: "raw",
      headers: {
        "content-type": getContentType(file),
        "x-ms-blob-type": "BlockBlob",
      },
    };

    let attempts = 0;
    const maxAttempts = 3;

    while (attempts < maxAttempts) {
      try {
        await Upload.startUpload(options);

        break;
      } catch (error) {
        console.error(`Attempt ${attempts + 1} failed with error: ${error}`);
      }

      attempts++;
      if (attempts < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }

    if (attempts === maxAttempts) {
      console.error(`Failed to upload ${file} after ${maxAttempts} attempts`);
    }
  });

  await Promise.all(uploadPromises);
  console.log("All uploads completed");
};

export function getFilenameFromPath(filePath: string): string {
  return filePath.substring(filePath.lastIndexOf("/") + 1);
}

export const useGetMedia = (
  setUpdatedUris: SetterOrUpdater<string[]>,
  onlyImages = false
) => {
  const getMedia = useCallback(async (index: number) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: onlyImages
        ? ImagePicker.MediaTypeOptions.Images
        : ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
    });

    setUpdatedUris((state) => {
      const newState = [...state];
      if (!result.canceled) {
        newState[index] = result.assets[0].uri;
      }
      return newState;
    });
  }, []);

  return getMedia;
};

export const getMediaTypeFromUri = (uri: string) => {
  if (uri.endsWith(".jpeg") || uri.endsWith(".jpg")) {
    return MediaType.IMAGE;
  } else if (uri.endsWith(".mp4")) {
    return MediaType.VIDEO;
  } else if (uri.endsWith(".mov")) {
    return MediaType.VIDEO;
  }
  return MediaType.IMAGE;
};

export const getCleanUrl = (url: string) => {
  const urlObject = new URL(url);
  return `${urlObject.protocol}//${urlObject.host}${urlObject.pathname}`;
};

export const getMediaCreateDTOs = (urls: string[]) => {
  return (
    urls.map((url) => {
      const newMedia: MediaCreateDTO = {
        uri: url,
        mediaType: getMediaTypeFromUri(url),
      };
      return newMedia;
    }) || []
  );
};

export function useFetchUrisByChatId(
  database: SQLiteDatabase,
  chatId: string
) {
  const [uris, setUris] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetchUrisByChatTargetIdTypePair(database, chatId)
      .then((fetchedUris) => {
        setUris(fetchedUris);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return { uris, loading };
}

export function getMediaCreateDTOsFromUris(uris: string[]): MediaCreateDTO[] {
  return uris.map((uri) => {
    return {
      uri,
      mediaType: getMediaTypeFromUri(uri),
    };
  });
}

export const useSelectMedia = (uri: string | undefined | null) => {
  const setMediaViewer = useSetMediaViewerState();

  if(!uri) {
    return () => null;
  }

  const handleSelectMedia = () => {
    setMediaViewer((state) => ({
      visible: false,
      selectedImageIndex: 0,
      uris: [uri],
    }));
    router.push("/main/portofolioModal");
  };

  return handleSelectMedia;
};
