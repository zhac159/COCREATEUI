import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { MediaType } from "../constants/mediaTypes";

export type GetMediaOptions = {
  includeVideos?: boolean;
};

export const useGetMedia = (options?: GetMediaOptions) => {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const mediaTypes: ImagePicker.MediaType[] = options?.includeVideos
      ? ["images", "videos", "livePhotos"]
      : ["images"];

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: mediaTypes,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      return {
        uri: result.assets[0].uri,
        type:
          result.assets[0].type === "image" ? MediaType.IMAGE : MediaType.VIDEO,
      };
    }
  };

  return { image, pickImage };
};
