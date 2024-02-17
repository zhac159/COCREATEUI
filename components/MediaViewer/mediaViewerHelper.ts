import { CacheManager } from "react-native-expo-image-cache";
import { useCallback } from "react";

export const useCacheImages = () => {
  return useCallback(async (uris: string[]) => {
    const maxAttempts = 3;
    const paths = await Promise.all(
      uris.map(async (uri) => {
        console.log("urihere", uri);
        let path: string | undefined = "";
        const delay = 2000;
        for (let attempts = 0; attempts < maxAttempts; attempts++) {
          try {
            path = await CacheManager.get(uri, {}).getPath();
            if (path) break;
          } catch (error) {
            console.error(
              `Attempt ${attempts + 1} to download ${uri} failed`,
              error
            );
          }
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
        return path || "";
      })
    );
    return paths;
  }, []);
};
