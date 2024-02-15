import { CacheManager } from "react-native-expo-image-cache";
import { useCallback } from "react";

export const useCacheImages = () => {
  return useCallback(async (uris: string[]) => {
    const paths = await Promise.all(
      uris.map(async (uri) => {
        const path = await CacheManager.get(uri, {}).getPath();
        return path || "";
      })
    );
    return paths;
  }, []);
};