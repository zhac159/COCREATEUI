import { useCallback, useEffect, useState } from "react";
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
  cleanUrl = true
) => {
  const { mutate: prepareUpload, isLoading } = usePostApiPrepare();

  const [filesUploadingStatus, setFilesUploadingStatus] = useState<Map<
    string,
    number
  > | null>();

  const checkAndSetFilesUploadingStatus = (uploadId: string) => {
    if (!filesUploadingStatus) return;
    setFilesUploadingStatus((prev) => {
      const newMap = new Map(prev);
      newMap.set(uploadId, 100);
      return newMap;
    });
  };

  const debouncedSetFilesUploadingStatus = debounce((data: ProgressData) => {
    setFilesUploadingStatus((prev) => {
      const newMap = new Map(prev);
      newMap.set(data.id, data.progress);
      return newMap;
    });
  }, 5);

  const debouncedCompleteFilesUploadingStatus = (data: CompletedData) => {
    console.log("completed", data.id);
    checkAndSetFilesUploadingStatus(data.id);
  };

  useEffect(() => {
    if (filesUploadingStatus) {
      const allValuesAreHundred = Array.from(
        filesUploadingStatus.values()
      ).every((value) => value === 100);
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
                await uploadFiles(sasURIs, uris);
                resolve(
                  sasURIs.map((uri) => (cleanUrl ? getCleanUrl(uri) : uri))
                );
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

export async function downloadFile(url: string) {
  const { uri } = await FileSystem.downloadAsync(
    url,
    FileSystem.documentDirectory + getFilenameFromUrl(url)
  );
  return uri;
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
