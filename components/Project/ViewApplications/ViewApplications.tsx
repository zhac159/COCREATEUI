import { EnquiryDTO, UserProfilesDTO } from "@/common/api/model";
import { FC, useContext } from "react";
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
import { createAndExchangeKeys } from "@/common/encryption/encryptionHelper";
import { ChatType } from "@/components/Chats/ChatHelper";
import { ConnectionContext } from "@/app/main/_layout";

type ViewApplicationsProps = {
  enquiries: EnquiryDTO[];
};

const ViewApplications: FC<ViewApplicationsProps> = ({ enquiries }) => {
  const [applicantsProfiles, setApplicantsProfiles] =
    useState<UserProfilesDTO>();

  const connection = useContext(ConnectionContext);

  const [swipingDistance, setSwipingDistance] = useState(0);

  const { mutate: getUserProfiles } = usePostApiUserProfiles({
    mutation: {
      onSuccess: (data) => {
        setApplicantsProfiles(data);
      },
    },
  });

  const { mutate: shortListApplication } = usePutApiEnquiryShortlistEnquiry({
    mutation: {
      onSuccess: (data) => {},
    },
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

  if (!applicantsProfiles || !applicantsProfiles.userProfiles)
    return <Text>Loading...</Text>;

  return (
    <>
      <Swiper
        cards={applicantsProfiles?.userProfiles}
        renderCard={(userProfile) => <UserProfile userProfile={userProfile} />}
        containerStyle={{
          backgroundColor: "black",
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
          createAndExchangeKeys(
            enquiries[index].enquirer?.publicKey || "",
            enquiries[index].enquirer?.userId || 0,
            ChatType.Enquiry,
            connection
          );
        }}
        onSwipedAborted={() => setSwipingDistance(0)}
        onSwiped={() => setSwipingDistance(0)}
        verticalSwipe={false}
        cardVerticalMargin={0}
        cardHorizontalMargin={0}
        stackSize={4}
        stackSeparation={4}
        disableBottomSwipe
      />
      <ConfirmationButtons
        onConfirm={() => console.log("confirm")}
        onCancel={() => console.log("cancel")}
        swipingDistance={swipingDistance}
      />
    </>
  );
};

export default ViewApplications;
