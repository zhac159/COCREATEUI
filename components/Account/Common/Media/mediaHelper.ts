import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { useCallback } from "react";
import { SetterOrUpdater } from "recoil";
import { MediaType } from "./MediaType";

const getContentType = (uri: string) => {
  if (uri.endsWith('.jpeg') || uri.endsWith('.jpg')) {
    return 'image/jpeg';
  } else if (uri.endsWith('.mp4')) {
    return 'video/mp4';
  } else if (uri.endsWith('.mov')) {
    return 'video/quicktime';
  }
  return 'application/octet-stream';
};

export const uploadFiles = async (sasUris: string[], files: string[]) => {
  for (let i = 0; i < sasUris.length; i++) {
    const sasUri = sasUris[i];
    const file = files[i];

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
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }
  }
};

export const useGetMedia = ( setUpdatedUris: SetterOrUpdater<string[]>, onlyImages = false) => {
  const getMedia = useCallback(async (index: number) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: onlyImages ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.All,
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
  if (uri.endsWith('.jpeg') || uri.endsWith('.jpg')) {
    return MediaType.IMAGE;
  } else if (uri.endsWith('.mp4')) {
    return MediaType.VIDEO;
  } else if (uri.endsWith('.mov')) {
    return MediaType.VIDEOMOV;
  }
  return MediaType.IMAGE;
}