import { usePostApiPrepare } from "@/api/endpoints/cocreateApi";
import { EntityType, MediaUpdateDTO, PrepareUploadDTO } from "@/api/model";
import { useCallback, useState } from "react";
import { MediaType } from "../constants/mediaTypes";
import Upload, { UploadOptions } from "react-native-background-upload";
import { Platform } from "react-native";
import * as FileSystem from "expo-file-system";

export const useUploadMedia = (entityType: EntityType, cleanUrl = true) => {
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [filesUploadingStatus, setFilesUploadingStatus] =
    useState<Map<string, number>>();
  const { mutate: prepareUpload } = usePostApiPrepare();

  const upload = useCallback(
    async (uris: string[]): Promise<string[]> =>
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

    [entityType]
  );

  const uploadMedias = useCallback(
    async (medias: MediaUpdateDTO[]): Promise<MediaUpdateDTO[]> => {
      const localMedias = medias.filter(
        (media) => !media.uri.startsWith("http")
      );

      if (localMedias.length > 0) {
        const localUris = localMedias.map((media) => media.uri);
        const uploadedUrls = await upload(localUris);
        localMedias.forEach((media, index) => {
          media.uri = uploadedUrls[index];
        });
      }

      return medias;
    },
    [upload]
  );

  return { uploadMedias, uploadedUrls, filesUploadingStatus, upload };
};

const getMediaTypeFromUri = (uri: string) => {
  if (uri.endsWith(".jpeg") || uri.endsWith(".jpg")) {
    return MediaType.IMAGE;
  } else if (uri.endsWith(".mp4")) {
    return MediaType.VIDEO;
  } else if (uri.endsWith(".mov")) {
    return MediaType.VIDEO;
  }
  return MediaType.IMAGE;
};

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

const mapUrisToPrepareUploadSubmittions = (
  uris: string[],
  entityType: EntityType
) => {
  return uris.map((uri: string) => {
    const prepareUpload: PrepareUploadDTO = {
      entity: entityType,
      mediaType: getMediaTypeFromUri(uri),
    };
    return prepareUpload;
  });
};

const getCleanUrl = (url: string) => {
  const urlObject = new URL(url);
  return `${urlObject.protocol}//${urlObject.host}${urlObject.pathname}`;
};

export const uploadFiles = async (sasUris: string[], files: string[]) => {
  const uploadPromises = sasUris.map(async (sasUri, index) => {
    let file = files[index];

    if (Platform.OS === "android" && file.startsWith("file://")) {
      const contentUri = await FileSystem.getContentUriAsync(file);
      file = contentUri;
    }

    console.log("Uploading file", file);

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
