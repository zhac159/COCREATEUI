import { useCallback } from "react";
import { usePostApiPrepare } from "../api/endpoints/cocreateApi";
import { EntityType, PrepareUploadDTO } from "../api/model";
import {
  getCleanUrl,
  getMediaTypeFromUri,
  uploadFiles,
} from "@/components/Account/Common/Media/mediaHelper";
import * as FileSystem from "expo-file-system";

export const usePrepareAndUpload = (entityType: EntityType, cleanUrl = true) => {
  const { mutate: prepareDownload } = usePostApiPrepare();

  const handleUpload = useCallback(
    (uris: string[]): Promise<string[]> => {
      return new Promise((resolve, reject) => {
        const prepareUploadSubmission: PrepareUploadDTO[] =
          uris.map((uri: string) => {
            const prepareUpload: PrepareUploadDTO = {
              entity: entityType,
              mediaType: getMediaTypeFromUri(uri),
            };
            return prepareUpload;
          }) || [];

        prepareDownload(
          { data: prepareUploadSubmission },
          {
            onSuccess: async (data) => {
              const sasURIs = data.sasURIs;
              console.log("SAS URIs", sasURIs);
              if (sasURIs) {
                await uploadFiles(sasURIs || [], uris);
                resolve(sasURIs.map((uri, index) => cleanUrl ? getCleanUrl(uri || ""):uri ));
              }
            },
            onError: (error) => {
              reject(error);
            },
          }
        );
      });
    },
    [entityType, prepareDownload]
  );

  return handleUpload;
};

export async function downloadFile(url: string) {
  const { uri } = await FileSystem.downloadAsync(
    url,
    FileSystem.documentDirectory + getFilenameFromUrl(url)
  );
  return uri;
}

function getFilenameFromUrl(url: string) {
  return url.substring(url.lastIndexOf('/') + 1);
}