import { PortofolioContentDTO } from "@/common/api/model";
import { FC, useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Carousel, Pagination } from "react-native-snap-carousel";
import { FontAwesome6 } from "@expo/vector-icons";
import { useTheme } from "@/components/Themes/theme";
import { skillStyles } from "../Skills/Skill";
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
  const uris = portofolioContent.medias?.map((media) => media.uri || "") || [];
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);
  const setMediaViewer = useSetMediaViewerState();

  const setPortofolioContent = useSetPortofolioContentByIdState(
    portofolioContent.id || 0
  );

  const [cachedUris, setCachedUris] = useState<string[]>([]);
  const cacheImages = useCacheImages();

  const fetchCachedUris = async (asset: PortofolioContentDTO) => {
    var uris = asset.medias?.map((media) => media.uri || "") || [];

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

    router.push("/portofolioModal");
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
        ref={carouselRef}
        vertical={false}
        data={uris}
        hasParallaxImages
        containerCustomStyle={{
          paddingLeft: 9,
          paddingTop: 12,
          paddingBottom: 12,
        }}
        renderItem={renderItem}
        sliderWidth={windowWidth}
        itemWidth={windowWidth}
        onScrollIndexChanged={(index) => setActiveIndex(index)}
      />
      <Pagination
        dotsLength={uris.length}
        activeDotIndex={activeIndex}
        containerStyle={{
          position: "absolute",
          bottom: 0,
          marginBottom: 30,
          alignSelf: "center",
        }}
        dotStyle={{
          width: 13,
          height: 13,
          borderRadius: 15,
          backgroundColor: theme.colors.white,
          marginHorizontal: -2,
        }}
        inactiveDotStyle={{
          width: 13,
          height: 13,
          borderRadius: 15,
          backgroundColor: theme.colors.gray,
          marginHorizontal: -2,
        }}
        inactiveDotOpacity={1}
        inactiveDotScale={1}
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
        {editMode ? (
          <TextInput
            placeholder="Description..."
            style={{
              ...theme.customFonts.primary.small,
              backgroundColor: theme.colors.lightGray,
              // borderRadius: 7,
              // height: 100,
              paddingHorizontal: 5,
              width: "80%",
            }}
            numberOfLines={1}
            value={portofolioContent.description || ""}
            onChangeText={(description) =>
              setPortofolioContent((state) => ({
                ...state,
                description,
              }))
            }
          />
        ) : (
          <Text
            style={{
              ...theme.customFonts.primary.small,
              width: "80%",
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {portofolioContent.description || ""}
          </Text>
        )}
      </View>
    </View>
  );
};

export default PortofolioContent;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "10%",
    width: "100%",
    marginRight: 40,
  },
  imageContainer: {
    backgroundColor: "black",
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
    top: "-2%",
    right: "-2%",
    backgroundColor: "red",
    borderRadius: 100,
    padding: 7,
  },
});
