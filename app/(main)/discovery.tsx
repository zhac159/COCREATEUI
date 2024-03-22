import { usePostApiUserMatchingProjects } from "@/common/api/endpoints/cocreateApi";
import { ProjectWithMatchingRolesListDTO } from "@/common/api/model";
import ConfirmationButtons from "@/components/Discovery/ConfirmationButtons";
import MatchingProject from "@/components/Discovery/MatchingProjectRole/MatchingProjectRole";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import Swiper from "react-native-deck-swiper";

export default function Discovery() {
  const [matchingProjects, setMatchingProjects] =
    useState<ProjectWithMatchingRolesListDTO>();

  const [swipingDistance, setSwipingDistance] = useState(0);

  const { mutate: getMatchingProjects } = usePostApiUserMatchingProjects({
    mutation: {
      onSuccess: (data) => {
        setMatchingProjects(data);
      },
    },
  });

  useEffect(() => {
    getMatchingProjects({
      data: {
        distance: 100,
        effort: 1000000,
      },
    });
  }, []);

  if (
    !matchingProjects ||
    !matchingProjects.projectWithMatchingRoles ||
    matchingProjects.projectWithMatchingRoles.length === 0
  )
    return <Text>Loading...</Text>;

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
