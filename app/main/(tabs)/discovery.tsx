import {
  usePostApiEnquiryCreate,
  usePostApiSeenMatches,
  usePostApiUserMatchingProjects,
} from "@/common/api/endpoints/cocreateApi";
import { ProjectWithMatchingRolesListDTO } from "@/common/api/model";
import LoadingBackdrop from "@/components/Common/LoadingBackdrop";
import ConfirmationButtons from "@/components/Discovery/ConfirmationButtons";
import MatchingProject from "@/components/Discovery/MatchingProjectRole/MatchingProjectRole";
import NoMatchingProjectsPage from "@/components/Discovery/NoMatchingProjectsPage";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { StyleSheet, Text } from "react-native";
import Swiper from "react-native-deck-swiper";

export default function Discovery() {
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

  const { mutate: createEnquiry } = usePostApiEnquiryCreate({
    mutation: {
      onSuccess: (data) => {
        console.log(data);
      },
    },
  });

  useFocusEffect(
    useCallback(() => {
      getMatchingProjects({
        data: {
          distance: 100,
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
          setSwipingDistance(0),
            seenMatchingProject({
              data: {
                projectRoleId:
                  matchingProjects.projectWithMatchingRoles![index]
                    .projectRoleId,
              },
            });
        }}
        onSwipedRight={(index) => {
          createEnquiry({
            data: {
              projectRoleId:
                matchingProjects.projectWithMatchingRoles![index].projectRoleId,
              enquiryMessage: "Hello, I am interested in your project",
            },
          });
        }}
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
});
