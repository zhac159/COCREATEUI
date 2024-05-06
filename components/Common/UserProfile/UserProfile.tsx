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

type UserProfileProps = {
  userProfile: UserProfileDTO;
};

const UserProfile: FC<UserProfileProps> = ({ userProfile }) => {
  const theme = useTheme();

  console.log(userProfile);

  const useMemoizedExperiences = useMemo(
    () => (
      <View
        style={{ ...styles.container, backgroundColor: theme.colors.white }}
      >
        <ScrollView contentContainerStyle={{ ...styles.scrollContainer }}>
          <TouchableWithoutFeedback>
            <View
              style={{
                flex: 1,
                gap: 50,
                width: "90%",
                alignSelf: "center",
              }}
            >
              <UserProfileDetails
                username={"AbithaMaha"}
                rating={4.8}
                rolesWorked={4}
                projectsCommisioned={32}
              />
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
          </TouchableWithoutFeedback>
        </ScrollView>
      </View>
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
});
