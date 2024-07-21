import {
  EnquiryDTO,
  UserProfileDTO,
  UserProfilesDTO,
} from "@/common/api/model";
import { FC, useCallback, useContext, useMemo } from "react";
import { Text } from "react-native";
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
import { useUpdateEnquiryShortlistedInProjects } from "@/components/RecoilStates/profileState";
import LoadingBackdrop from "@/components/Common/LoadingBackdrop";
import NoApplicationsPage from "./NoApplicationsPage";

type ViewApplicationsProps = {
  enquiries: EnquiryDTO[];
  close: () => void;
};

const ViewApplications: FC<ViewApplicationsProps> = ({ enquiries, close }) => {
  const [applicantsProfiles, setApplicantsProfiles] =
    useState<UserProfilesDTO>();

  const updateApplicationsToShortlisted =
    useUpdateEnquiryShortlistedInProjects();

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
            shortListApplication({
              params: {
                enquiryId: enquiries[index].id,
              },
            });
            updateApplicationsToShortlisted(enquiries[index].id || 0);
          }}
          onSwipedAborted={() => setSwipingDistance(0)}
          onSwiped={() => setSwipingDistance(0)}
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
  }, [applicantsProfiles]);

  if (!applicantsProfiles || isLoading)
    return <LoadingBackdrop />;

  if(applicantsProfiles.userProfiles.length === 0) {
    return (
      <NoApplicationsPage
      turnBack={close}
      />
    )
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
        onConfirm={() => console.log("confirm")}
        onCancel={() => console.log("cancel")}
        swipingDistance={swipingDistance}
      />
    </>
  );
};

export default ViewApplications;
