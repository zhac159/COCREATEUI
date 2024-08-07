import { useCallback, useEffect, useRef, useState } from "react";
import { usePostApiPrepare } from "../api/endpoints/cocreateApi";
import { EntityType, PrepareUploadDTO } from "../api/model";
import {
  getCleanUrl,
  getMediaTypeFromUri,
  uploadFiles,
} from "@/components/Account/Common/Media/mediaHelper";
import * as FileSystem from "expo-file-system";
import Upload, {
  CompletedData,
  ProgressData,
} from "react-native-background-upload";
import * as MediaLibrary from 'expo-media-library';

const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return function (this: any, ...args: any[]) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
};

export const usePrepareAndUpload = (
  entityType: EntityType,
  onUploaded?: (urls: string[]) => void,
  cleanUrl = true
) => {
  const { mutate: prepareUpload, isLoading } = usePostApiPrepare();

  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

  const [filesUploadingStatus, setFilesUploadingStatus] = useState<Map<
    string,
    number
  > | null>();

  const previousFilesUploadingStatus = useRef(filesUploadingStatus);

  console.log("filesUploadingStatus", filesUploadingStatus);

  useEffect(() => {
    if (
      previousFilesUploadingStatus.current !== null &&
      filesUploadingStatus === null
    ) {
      onUploaded?.(uploadedUrls);
    }
    previousFilesUploadingStatus.current = filesUploadingStatus;
  }, [filesUploadingStatus, onUploaded]);


  const checkAndSetFilesUploadingStatus = (uploadId: string) => {
    console.log("checkAndSetFilesUploadingStatus", uploadId);
    if (!filesUploadingStatus) return;
    setFilesUploadingStatus((prev) => {
      const newMap = new Map(prev);
      newMap.set(uploadId, 100);
      return newMap;
    });
  };

  const debouncedSetFilesUploadingStatus = debounce((data: ProgressData) => {
    console.log("debouncedSetFilesUploadingStatus", data);
    if(data.progress > 100) {
      data.progress = 100;
    }
    setFilesUploadingStatus((prev) => {
      const newMap = new Map(prev);
      newMap.set(data.id, data.progress);
      return newMap;
    });
  }, 5);

  const debouncedCompleteFilesUploadingStatus = (data: CompletedData) => {
    checkAndSetFilesUploadingStatus(data.id);
  };
  

  useEffect(() => {
    if (filesUploadingStatus) {
      const allValuesAreHundred = Array.from(
        filesUploadingStatus.values()
      ).every((value) => value > 100);
      if (allValuesAreHundred) {
        setFilesUploadingStatus(null);
      }
    }
  }, [filesUploadingStatus]);

  useEffect(() => {
    const handleProgress = (data: ProgressData) => {
      debouncedSetFilesUploadingStatus(data);
    };

    if (filesUploadingStatus) {
      var progressListener = Upload.addListener(
        "progress",
        null,
        handleProgress
      );
      var completeListener = Upload.addListener(
        "completed",
        null,
        debouncedCompleteFilesUploadingStatus
      );
    } else return;

    return () => {
      progressListener.remove();
      completeListener.remove();
    };
  }, [debouncedSetFilesUploadingStatus, filesUploadingStatus]);

  const upload = useCallback(
    (uris: string[]): Promise<string[]> =>
      new Promise((resolve, reject) => {
        const filesUploadingStatus = new Map(uris.map((uri) => [uri, 0]));
        setFilesUploadingStatus(filesUploadingStatus);

        const prepareUploadSubmission = mapUrisToPrepareUploadSubmittions(
          uris,
          entityType
        );

        prepareUpload(
          { data: prepareUploadSubmission },
          {
            onSuccess: async (data) => {
              const sasURIs = data.sasURIs;
              if (sasURIs) {
                const cleanUrls = sasURIs.map((uri) => getCleanUrl(uri));
                await uploadFiles(sasURIs, uris);
                setUploadedUrls(cleanUrl ? cleanUrls : sasURIs);
                resolve(cleanUrl ? cleanUrls : sasURIs);
              }
            },
            onError: (error) => {
              reject(error);
            },
          }
        );
      }),

    [entityType, prepareUpload]
  );

  return { upload, isLoading: !!filesUploadingStatus, filesUploadingStatus };
};

async function ensureMediaLibraryPermissions() {
  const { status } = await MediaLibrary.getPermissionsAsync();
  console.log(`Current permission status: ${status}`);
  if (status !== 'granted') {
    const { status: newStatus } = await MediaLibrary.requestPermissionsAsync();
    console.log(`New permission status: ${newStatus}`);
    if (newStatus !== 'granted') {
      throw new Error('Permission to access media library is required!');
    }
  }
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Usage in your downloadFile function
export async function downloadFile(url: string) {
  try {
    const filename = getFilenameFromUrl(url);
    const fileUri = FileSystem.documentDirectory + filename;

    await delay(5000);

    const { uri } = await FileSystem.downloadAsync(url, fileUri);

    await ensureMediaLibraryPermissions();

    const asset = await MediaLibrary.createAssetAsync(uri);
    const album = await MediaLibrary.getAlbumAsync('WeCreateX');
    if (album == null) {
      await MediaLibrary.createAlbumAsync('WeCreateX', asset, false);
    } else {
      await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
    }
    return asset.uri;
  } catch (error) {
    throw error;
  }
}

function getFilenameFromUrl(url: string) {
  return url.substring(url.lastIndexOf("/") + 1);
}



function mapUrisToPrepareUploadSubmittions(
  uris: string[],
  entityType: EntityType
) {
  return uris.map((uri: string) => {
    const prepareUpload: PrepareUploadDTO = {
      entity: entityType,
      mediaType: getMediaTypeFromUri(uri),
    };
    return prepareUpload;
  });
}
