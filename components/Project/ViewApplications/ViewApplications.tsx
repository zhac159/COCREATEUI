import {
  EnquiryDTO,
  UserProfileDTO,
  UserProfilesDTO,
} from "@/common/api/model";
import { FC, useCallback, useMemo, useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import Swiper from "react-native-deck-swiper";
import ConfirmationButtons from "@/components/Discovery/ConfirmationButtons";
import {
  usePostApiUserProfiles,
  usePutApiEnquiryShortlistEnquiry,
} from "@/common/api/endpoints/cocreateApi";
import UserProfile from "@/components/Common/UserProfile/UserProfile";
import { IconButton } from "react-native-paper";
import { useSetProjectState } from "@/components/RecoilStates/profileState";
import LoadingBackdrop from "@/components/Common/LoadingBackdrop";
import NoApplicationsPage from "./NoApplicationsPage";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
} from "react-native-reanimated";
import { View, StyleSheet } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { windowHeight } from "@/components/Account/Common/getWindowDimensions";

type ViewApplicationsProps = {
  enquiries: EnquiryDTO[];
  close: () => void;
};

const ViewApplications: FC<ViewApplicationsProps> = ({ enquiries, close }) => {
  const swiperRef = useRef<Swiper<UserProfileDTO>>(null);

  const [isSwipedAll, setIsSwipedAll] = useState(false);

  const [applicantsProfiles, setApplicantsProfiles] =
    useState<UserProfilesDTO>();

  const setProjects = useSetProjectState();

  const handleUpdateShortlistedEnquiry = (enquiryId: number) => {
    setProjects((projects) => {
      const newProjects = projects.map((project) => {
        if (!project.projectRoles) return project;

        const newProjectRoles = project.projectRoles.map((role) => {
          if (!role.enquiries) return role;

          const newEnquiries = role.enquiries.map((enquiry) => {
            if (enquiry.id !== enquiryId) return enquiry;

            return { ...enquiry, shortlisted: true };
          });

          return { ...role, enquiries: newEnquiries };
        });

        return { ...project, projectRoles: newProjectRoles };
      });
      return newProjects;
    });
  };

  const [swipingDistance, setSwipingDistance] = useState(0);

  const { mutate: getUserProfiles, isLoading } = usePostApiUserProfiles({
    mutation: {
      onSuccess: (data) => {
        setApplicantsProfiles(data);
      },
    },
  });

  const { mutate: shortListApplication } = usePutApiEnquiryShortlistEnquiry({
    mutation: {
      onSuccess: () => {},
    },
  });

  const renderCard = useCallback((userProfile: UserProfileDTO) => {
    return <UserProfile userProfile={userProfile} />;
  }, []);

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

  useEffect(() => {
    const applicantsIds = enquiries
      ?.map((enquiries) => enquiries.enquirer?.userId)
      .filter((id): id is number => id !== undefined);
    if (!applicantsIds) return;
    getUserProfiles({
      data: {
        userIds: applicantsIds,
      },
    });
  }, []);

  const memoizedSwiper = useMemo(() => {
    return (
      applicantsProfiles && (
        <Swiper
          ref={swiperRef}
          cards={applicantsProfiles.userProfiles}
          renderCard={renderCard}
          containerStyle={{
            backgroundColor: "white",
            padding: 0,
          }}
          onSwiping={(x) => {
            setSwipingDistance(x);
          }}
          onSwipedRight={(index) => {
            triggerAnimation();
            shortListApplication({
              params: {
                enquiryId: enquiries[index].id,
              },
            });
            handleUpdateShortlistedEnquiry(enquiries[index].id);
          }}
          onSwipedAborted={() => setSwipingDistance(0)}
          onSwiped={() => setSwipingDistance(0)}
          onSwipedAll={() => setIsSwipedAll(true)}
          verticalSwipe={false}
          cardVerticalMargin={0}
          showSecondCard={false}
          cardHorizontalMargin={0}
          stackSize={4}
          stackSeparation={4}
          disableBottomSwipe
        />
      )
    );
  }, [applicantsProfiles, triggerAnimation]);

  if (!applicantsProfiles || isLoading) return <LoadingBackdrop />;

  if (applicantsProfiles.userProfiles.length === 0 || isSwipedAll) {
    return <NoApplicationsPage turnBack={close} />;
  }

  return (
    <>
      <IconButton
        icon="close"
        onPress={close}
        style={{ position: "absolute", right: "5%", top: "10%", zIndex: 1000 }}
      />
      {memoizedSwiper}
      <ConfirmationButtons
        lightTheme
        onConfirm={() => {
          swiperRef?.current?.swipeRight();
        }}
        onCancel={() => {
          swiperRef?.current?.swipeLeft();
        }}
        cancelButtonText="Reject"
        confirmButtonText="Shortlist Applicant"
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
};

export default ViewApplications;

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
