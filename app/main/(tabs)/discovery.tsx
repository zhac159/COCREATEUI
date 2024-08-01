import {
  usePostApiEnquiryCreate,
  usePostApiSeenMatches,
  usePostApiUserMatchingProjects,
} from "@/common/api/endpoints/cocreateApi";
import {
  ProjectWithMatchingRoleDTO,
  ProjectWithMatchingRolesListDTO,
} from "@/common/api/model";
import {
  windowHeight,
  windowWidth,
} from "@/components/Account/Common/getWindowDimensions";
import LoadingBackdrop from "@/components/Common/LoadingBackdrop";
import ConfirmationButtons from "@/components/Discovery/ConfirmationButtons";
import MatchingProject from "@/components/Discovery/MatchingProjectRole/MatchingProjectRole";
import NoMatchingProjectsPage from "@/components/Discovery/NoMatchingProjectsPage";
import { useDiscoveryFiltersValue } from "@/components/RecoilStates/discoveryFilters";
import { FontAwesome6 } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import React, { LegacyRef, useCallback, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Swiper from "react-native-deck-swiper";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
} from "react-native-reanimated";

export default function Discovery() {
  const swiperRef = useRef<Swiper<ProjectWithMatchingRoleDTO>>(null);

  const fadeAnim = useSharedValue(0);
  const scaleAnim = useSharedValue(0.5);

  const triggerAnimation = () => {
    fadeAnim.value = 0;
    scaleAnim.value = 0.5;
    fadeAnim.value = withTiming(1, {
      duration: 300,
      easing: Easing.out(Easing.ease),
    });
    scaleAnim.value = withSpring(1, { damping: 5 });

    // Hide the animation after a delay
    setTimeout(() => {
      fadeAnim.value = withTiming(0, { duration: 300 });
    }, 1000);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeAnim.value,
      transform: [{ scale: scaleAnim.value }],
    };
  });

  const discoverFilters = useDiscoveryFiltersValue();

  const [matchingProjects, setMatchingProjects] =
    useState<ProjectWithMatchingRolesListDTO>();

  const [swipingDistance, setSwipingDistance] = useState(0);

  const { mutate: getMatchingProjects, isLoading } =
    usePostApiUserMatchingProjects({
      mutation: {
        onSuccess: (data) => {
          setMatchingProjects(data);
        },
      },
    });

  const { mutate: seenMatchingProject } = usePostApiSeenMatches();

  const { mutate: createEnquiry } = usePostApiEnquiryCreate();

  useFocusEffect(
    useCallback(() => {
      getMatchingProjects({
        data: {
          distance: 10000,
          effort: 1000000,
        },
      });
    }, [])
  );

  if (isLoading || !matchingProjects) return <LoadingBackdrop />;

  if (matchingProjects.projectWithMatchingRoles.length === 0) {
    return <NoMatchingProjectsPage />;
  }

  return (
    <>
      <Swiper
        ref={swiperRef}
        cards={matchingProjects.projectWithMatchingRoles}
        renderCard={(matchingProject) => (
          <MatchingProject matchingProject={matchingProject} />
        )}
        containerStyle={{
          backgroundColor: "black",
          padding: 0,
        }}
        onSwiping={(x) => {
          setSwipingDistance(x);
        }}
        onSwipedAborted={() => setSwipingDistance(0)}
        onSwiped={(index) => {
          setSwipingDistance(0);
          // seenMatchingProject({
          //   data: {
          //     projectRoleId:
          //       matchingProjects.projectWithMatchingRoles![index]
          //         .projectRoleId,
          //   },
          // });
        }}
        onSwipedRight={(index) => {
          triggerAnimation();
          // createEnquiry({
          //   data: {
          //     projectRoleId:
          //       matchingProjects.projectWithMatchingRoles![index].projectRoleId,
          //     enquiryMessage: "Hello, I am interested in your project",
          //   },
          // });
        }}
        verticalSwipe={false}
        cardVerticalMargin={0}
        cardHorizontalMargin={0}
        stackSize={5}
        infinite
        stackSeparation={50}
        secondCardZoom={0.1}
        disableBottomSwipe
        swipeAnimationDuration={740}
        stackAnimationFriction={7}
        stackAnimationTension={40} // Adjust this value
        zoomAnimationDuration={3000}
        zoomFriction={0} // Adjust this value
      />
      <ConfirmationButtons
        onConfirm={() => {
          swiperRef?.current?.swipeRight();
        }}
        onCancel={() => {
          swiperRef?.current?.swipeLeft();
        }}
        swipingDistance={swipingDistance}
      />
      <Animated.View style={[styles.animatedContainer, animatedStyle]}>
        <View
          style={{
            backgroundColor: "green",
            borderRadius: 100,
            width: 100,
            height: 100,
            marginBottom: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FontAwesome6 name="check" size={60} color="black" />
        </View>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  message: {
    fontSize: 16,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  animatedContainer: {
    position: "absolute",
    top: windowHeight / 3,
    width: "100%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
    alignItems: "center",
    justifyContent: "center",
  },
});
