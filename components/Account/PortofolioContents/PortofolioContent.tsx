import { PortofolioContentDTO } from "@/common/api/model";
import { FC, useEffect, useMemo, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { useTheme } from "@/components/Themes/theme";
import { router } from "expo-router";
import { useSetMediaViewerState } from "@/components/MediaViewer/mediaViewerState";
import { windowWidth } from "../Common/getWindowDimensions";
import Media from "@/components/MediaViewer/Media";
import { useCacheImages } from "@/components/MediaViewer/mediaViewerHelper";
import { useDeleteApiPortofolioContentId } from "@/common/api/endpoints/cocreateApi";
import { useSetPortofolioContentByIdState } from "@/components/RecoilStates/profileState";
import * as ImagePicker from "expo-image-picker";
import SkillIcon from "../Skills/SkillIcon";
import StyledTextField from "@/components/Common/StyledTextField";
import StyledCarousel from "@/components/Common/StyledCarousel";

type portofolioContentProps = {
  portofolioContent: PortofolioContentDTO;
  editMode?: boolean;
  filesUploadingStatus?: Map<string, number> | null | undefined;
};

const PortofolioContent: FC<portofolioContentProps> = ({
  portofolioContent,
  editMode = false,
  filesUploadingStatus,
}) => {
  const uris = useMemo(
    () => portofolioContent.medias?.map((media) => media.uri) || [],
    [portofolioContent.medias]
  );

  const setMediaViewer = useSetMediaViewerState();

  const setPortofolioContent = useSetPortofolioContentByIdState(
    portofolioContent.id || 0
  );

  const [cachedUris, setCachedUris] = useState<string[]>([]);
  const cacheImages = useCacheImages();

  const fetchCachedUris = async (asset: PortofolioContentDTO) => {
    var uris = asset.medias?.map((media) => media.uri) || [];

    var result = await cacheImages(uris || []);

    setCachedUris(result);
  };

  const handleUpdatePhoto = async (index: number) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
    });

    setPortofolioContent((state) => {
      const newState = { ...state, medias: [...(state?.medias ?? [])] };
      if (!result.canceled && newState.medias) {
        newState.medias[index] = {
          ...newState.medias[index],
          uri: result.assets[0].uri,
        };
      }
      return newState;
    });
  };

  const handleOnChangeText = (text: string) => {
    setPortofolioContent((state) => ({
      ...state,
      description: text,
    }));
  };

  const handlePress = (index: number) => {
    if (editMode) {
      handleUpdatePhoto(index);
      return;
    }

    setMediaViewer((state) => ({
      visible: false,
      selectedImageIndex: index,
      uris: cachedUris,
    }));

    router.push("/main/portofolioModal");
  };

  const theme = useTheme();

  const { mutate: deletePortofolioContent } = useDeleteApiPortofolioContentId({
    mutation: {
      onSuccess: () => {
        setPortofolioContent(undefined);
      },
    },
  });

  const deleteButton = useMemo(() => {
    if (!editMode) return null;
    return (
      <TouchableOpacity
        style={styles.deleteIconButton}
        onPress={() => {
          deletePortofolioContent({
            id: portofolioContent.id || 0,
          });
        }}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <FontAwesome6 name="minus" size={15} color="white" />
      </TouchableOpacity>
    );
  }, [portofolioContent, editMode]);

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <View style={styles.imageContainer} key={index}>
      <Media
        uri={cachedUris[index]}
        style={{ flex: 1, borderRadius: 14 }}
        onPress={() => handlePress(index)}
        editMode={editMode}
        loadingState={filesUploadingStatus?.get(uris[index])}
      />
      {deleteButton}
    </View>
  );

  const mainContent = () => {
    if (uris.length > 0) {
      return (
        <StyledCarousel
          width={windowWidth}
          data={uris}
          renderItem={renderItem}
        />
      );
    }
    return (
      <View
        style={{
          backgroundColor: theme.colors.lightGray,
          height: 483,
          width: "110%",
          borderRadius: 14,
        }}
      >
        {deleteButton}
      </View>
    );
  };

  useEffect(() => {
    fetchCachedUris(portofolioContent);
  }, [portofolioContent]);

  return (
    <View style={styles.container}>
      {mainContent()}
      <View style={styles.skillAndDescriptionContainer}>
        <SkillIcon skillType={portofolioContent.skillType || 0} />
        <StyledTextField
          editable={editMode}
          onChangeText={handleOnChangeText}
          value={portofolioContent.description || ""}
          textInputProps={{
            style: {
              width: "95%",
            },
          }}
        />
      </View>
    </View>
  );
};

export default PortofolioContent;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "10%",
    width: "87%",
    alignSelf: "center",
    marginRight: 40,
  },
  imageContainer: {
    height: 483,
    width: "90%",
    borderRadius: 14,
  },
  deleteIconButton: {
    position: "absolute",
    zIndex: 100,
    top: "0%",
    right: "-2%",
    backgroundColor: "red",
    borderRadius: 100,
    padding: 7,
  },
  textInput: {
    borderRadius: 7,
    paddingHorizontal: 5,
    width: "100%",
    alignSelf: "flex-start",
    textAlignVertical: "top",
  },
  skillAndDescriptionContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 0,
    gap: 10,
  },
});
