import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { MediaType } from "../constants/mediaTypes";

export const useGetMedia = () => {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      return {
        uri: result.assets[0].uri,
        type:
          result.assets[0].type === "image" ? MediaType.Image : MediaType.Video,
      };
    }
  };

  return { image, pickImage };
};
