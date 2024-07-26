import { UserProfileDTO } from "@/common/api/model";
import { FC, useMemo } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useTheme } from "../../Themes/theme";
import {
  tabBarHeight,
  windowHeight,
} from "../../Account/Common/getWindowDimensions";
import { ScrollView } from "react-native-gesture-handler";
import { TouchableWithoutFeedback } from "react-native";
import UserProfileDetails from "./UserProfileDetails";
import Experiences from "@/components/Experience/Experiences";
import ReviewCarousel from "../Review/ReviewCarousel";
import PortofolioContent from "@/components/Account/PortofolioContents/PortofolioContent";
import SkillsList from "@/components/Account/Skills/SkillsList";
import BackgroundColourAnimation from "@/components/Account/BackgroundColourAnimation";
import { useGetRolesCommissionedAndWorked } from "./userProfileHelper";

type UserProfileProps = {
  userProfile: UserProfileDTO;
};

const UserProfile: FC<UserProfileProps> = ({ userProfile }) => {
  const theme = useTheme();

  const { completedProjectRoles, completedProjects } =
  useGetRolesCommissionedAndWorked(userProfile.experiences);


  const useMemoizedExperiences = useMemo(
    () => (
      <>
        <BackgroundColourAnimation />
        <View style={{ ...styles.container, backgroundColor: "transparent" }}>
          <ScrollView contentContainerStyle={{ ...styles.scrollContainer }}>
            <TouchableWithoutFeedback>
              <View>
                <UserProfileDetails
                  username={userProfile.username}
                  rating={userProfile.rating}
                  rolesWorked={completedProjectRoles.length}
                  projectsCommisioned={completedProjects.length}
                />
                <View
                  style={styles.insideContainer}
                >
                  <Experiences experiences={userProfile.experiences} />
                  {userProfile.portofolioContents[0] && (
                    <PortofolioContent
                      editMode={false}
                      portofolioContent={userProfile.portofolioContents[0]}
                    />
                  )}
                  <SkillsList skills={userProfile.skills} />
                  <Text
                    style={{
                      ...theme.customFonts.primary.small,
                    }}
                  >
                    {userProfile.aboutYou}
                  </Text>
                  {userProfile.portofolioContents[1] && (
                    <PortofolioContent
                      editMode={false}
                      portofolioContent={userProfile.portofolioContents[0]}
                    />
                  )}
                  {userProfile.portofolioContents[2] && (
                    <PortofolioContent
                      editMode={false}
                      portofolioContent={userProfile.portofolioContents[0]}
                    />
                  )}
                  <ReviewCarousel
                    reviews={userProfile.reviewsReceived}
                    rating={userProfile.rating}
                    totalReviews={userProfile.totalReviews}
                  />
                  {userProfile.portofolioContents
                    .slice(3, 0)
                    .map((portofolioContent, index) => (
                      <PortofolioContent
                        key={index}
                        editMode={false}
                        portofolioContent={portofolioContent}
                      />
                    ))}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </View>
      </>
    ),

    [userProfile]
  );

  return useMemoizedExperiences;
};

export default UserProfile;

const styles = StyleSheet.create({
  scrollContainer: {
    borderRadius: 17,
    paddingBottom: 150,
  },
  container: {
    flex: 1,
    width: "100%",
  },
  roleImage: {
    width: "100%",
    height: windowHeight - tabBarHeight,
    borderRadius: 17,
  },
  projectImages: {
    width: "100%",
    height: 523,
  },
  teamPreviewContainerStyle: {
    paddingHorizontal: 28,
    paddingTop: 31,
    gap: 50,
  },
  insideContainer:{
    flex: 1,
    gap: 50,
    width: "90%",
    alignSelf: "center",
    marginTop: 40,
  }
});
