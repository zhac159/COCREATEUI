import { PortofolioContentDTO } from "@/common/api/model";
import { FC, useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
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

type portofolioContentProps = {
  portofolioContent: PortofolioContentDTO;
  editMode?: boolean;
};

const PortofolioContent: FC<portofolioContentProps> = ({
  portofolioContent,
  editMode = false,
}) => {
  const uris = portofolioContent.medias?.map((media) => media.uri) || [];
  const setMediaViewer = useSetMediaViewerState();

  const descriptionInputRef = useRef<TextInput>(null);

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

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <View style={styles.imageContainer} key={index}>
      <Media
        uri={cachedUris[index]}
        style={{ flex: 1, borderRadius: 14 }}
        onPress={() => handlePress(index)}
        editMode={editMode}
      />
      {editMode && (
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
      )}
    </View>
  );

  useEffect(() => {
    fetchCachedUris(portofolioContent);
  }, [portofolioContent]);

  return (
    <View style={styles.container}>
      <Carousel
        width={windowWidth}
        vertical={false}
        loop={false}
        data={uris}
        renderItem={renderItem}
        height={500}
        panGestureHandlerProps={{
          activeOffsetX: [-3, 3],
          failOffsetY: [-5, 5],
        }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 15,
        }}
      >
        <SkillIcon skillType={portofolioContent.skillType || 0} />
        <TextInput
          ref={descriptionInputRef}
          placeholder="Description..."
          style={{
            ...theme.customFonts.primary.small,
            backgroundColor: editMode ? theme.colors.lightGray : "transparent",
            borderRadius: 7,
            color: theme.colors.black,
            paddingHorizontal: 5,
            width: "80%",
          }}
          textAlignVertical={editMode ? "top" : "center"}
          numberOfLines={editMode ? 5 : 2}
          value={portofolioContent.description || ""}
          onChangeText={(description) =>
            setPortofolioContent((state) => ({
              ...state,
              description,
            }))
          }
          editable={editMode}
          multiline={true}
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
    shadowOpacity: 0.5,
    shadowRadius: 4,
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
});
