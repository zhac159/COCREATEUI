import { Text, TextInput, StyleSheet, ScrollView } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useTheme } from "@/components/Themes/theme";
import { Keyboard } from "react-native";
import { usePostApiAssetSearch } from "@/common/api/endpoints/cocreateApi";
import { useCallback, useEffect, useState } from "react";
import { AssetDTO } from "@/common/api/model";
import { AssetType } from "@/components/Account/Assets/assetHelper";
import AssetFinderTypeSelector from "@/components/AssetFinder/AssetFinderTypeSelector";
import FoundAssets from "@/components/AssetFinder/FoundAssets";
import AssetFinderWrapper from "@/components/AssetFinder/AssetFinderWrapper";
import AssetFinderTitle from "@/components/AssetFinder/AssetFinderTitle";

export default function AssetFinder() {
  const theme = useTheme();

  const params = useLocalSearchParams();
  const projectId = parseInt(params.projectId as string, 10);

  const [foundAssets, setFoundAssets] = useState<AssetDTO[]>([]);

  const [selectedAssetType, setSelectedAssetType] = useState<AssetType>();

  const [searchTerm, setSearchTerm] = useState("");

  const { mutate: searchAssets, isLoading } = usePostApiAssetSearch({
    mutation: {
      onSuccess: (data) => {
        setFoundAssets(data.assets);
      },
    },
  });

  const handleGoBack = useCallback(() => {
    setSelectedAssetType(undefined);
    setFoundAssets([]);
    setSearchTerm("");
  }, [selectedAssetType]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (searchTerm) {
        searchAssets({
          data: {
            searchTerm: searchTerm,
            assetType: selectedAssetType,
          },
        });
      }
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (selectedAssetType !== undefined) {
      searchAssets({
        data: {
          searchTerm: "",
          assetType: selectedAssetType,
        },
      });
    }
  }, [selectedAssetType]);

  return (
    <AssetFinderWrapper
      close={() => router.back()}
      goBack={() => handleGoBack()}
    >
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          ...styles.container,
        }}
        style={{
          width: "100%",
        }}
        onTouchStart={() => Keyboard.dismiss()}
        showsVerticalScrollIndicator={false}
      >
        <AssetFinderTitle assetType={selectedAssetType} />
        <TextInput
          style={{
            ...theme.customFonts.primary.medium,
            ...styles.searchInput,
            backgroundColor: theme.colors.lightGray,
          }}
          placeholder="Search for tools and assets"
          onChangeText={(text) => setSearchTerm(text)}
          value={searchTerm}
        />
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <>
            <FoundAssets assets={foundAssets} projectId={projectId} />
            <AssetFinderTypeSelector
              setSelectedAssetType={setSelectedAssetType}
              show={foundAssets.length === 0}
            />
          </>
        )}
      </ScrollView>
    </AssetFinderWrapper>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 35,
    fontWeight: "400",
  },
  container: {
    gap: 10,
    width: "100%",
    paddingHorizontal: 20,
    paddingBottom: 150,

    alignItems: "center",
  },
  searchInput: {
    fontSize: 20,
    padding: 10,
    marginVertical: 10,
    width: "100%",
    borderRadius: 15,
    alignSelf: "flex-start",
  },
  searchResults: {
    marginVertical: 10,
  },
});
