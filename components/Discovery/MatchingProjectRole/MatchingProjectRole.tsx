import { ProjectWithMatchingRoleDTO } from "@/common/api/model";
import { FC, useMemo } from "react";
import { StyleSheet, TouchableWithoutFeedback, View, Text } from "react-native";
import { useTheme } from "../../Themes/theme";
import Media from "../../MediaViewer/Media";
import { ScrollView } from "react-native-gesture-handler";
import {
  tabBarHeight,
  windowHeight,
} from "../../Account/Common/getWindowDimensions";
import { LinearGradient } from "expo-linear-gradient";
import RoleDetails from "./RoleDetails/RoleDetails";
import MatchingRoleKeywordsAndDescription from "./MatchingRoleKeywordsAndDescription";
import ProjectNameAndDescription from "./ProjectNameAndDescription";
import ProjectManagerPreview from "./ProjectManagerPreview";
import TeamMemberPreview from "./TeamMemberPreview";

type MatchingProjectProps = {
  matchingProject: ProjectWithMatchingRoleDTO;
};
const MatchingProject: FC<MatchingProjectProps> = ({ matchingProject }) => {
  const theme = useTheme();

  const matchingRole = matchingProject.project?.projectRoles?.find(
    (role) => role.id === matchingProject.projectRoleId
  );

  const otherRoles = matchingProject.project?.projectRoles?.filter(
    (role) => role.id !== matchingProject.projectRoleId
  );

  const matchingRoleNode = useMemo(
    () => (
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          <TouchableWithoutFeedback>
            <View
              style={{
                paddingBottom: 200,
                backgroundColor: theme.colors.lightBlack,
              }}
            >
              <View>
                <Media
                  onPress={() => console.log("pressed")}
                  uri={matchingRole?.medias?.[0].uri || ""}
                  style={styles.roleImage}
                />
                <LinearGradient
                  colors={["transparent", "black"]}
                  locations={[0.5, 0.75]}
                  style={StyleSheet.absoluteFillObject}
                />
              </View>
              <RoleDetails
                name={matchingRole?.name || "N/A"}
                location={matchingRole?.address || "N/A"}
                effort={matchingRole?.effort || 0}
                startDateString={matchingRole?.startDate || "N/A"}
                endDateString={matchingRole?.endDate || "N/A"}
                cost={matchingRole?.cost || 0}
                skillType={matchingRole?.skillType}
              />
              <MatchingRoleKeywordsAndDescription
                tags={matchingRole?.keywords || []}
                description={matchingRole?.description || ""}
              />
              <Media
                onPress={() => console.log("pressed")}
                uri={matchingProject?.project?.medias?.[0].uri || ""}
                style={styles.projectImages}
              />
              <ProjectNameAndDescription
                name={matchingProject?.project?.name || "N/A"}
                description={matchingProject?.project?.description || "N/A"}
              />
              <Media
                onPress={() => console.log("pressed")}
                uri={matchingProject?.project?.medias?.[1].uri || ""}
                style={styles.projectImages}
              />
              <ProjectManagerPreview
                userInfo={matchingProject?.project?.projectManager}
              />
              <View
                style={{
                  ...styles.teamPreviewContainerStyle,
                  backgroundColor: theme.colors.lightBlack,
                }}
              >
                <Text
                  style={{
                    ...theme.customFonts.primary.medium,
                    color: theme.colors.white,
                  }}
                >
                  Team
                </Text>
                {otherRoles?.map((role) => (
                  <TeamMemberPreview otherRole={role} key={role.id} />
                ))}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </View>
    ),
    []
  );

  return matchingRoleNode;
};

export default MatchingProject;

const styles = StyleSheet.create({
  scrollContainer: {
    borderRadius: 17,
  },
  container: {
    flex: 1,
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
