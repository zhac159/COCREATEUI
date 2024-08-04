import { MediaDTO, ProjectCompletedDTO } from "@/common/api/model";
import { FC } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import Media from "../MediaViewer/Media";
import { LinearGradient } from "expo-linear-gradient";
import {
  tabBarHeight,
  windowHeight,
  windowWidth,
} from "../Account/Common/getWindowDimensions";
import { useTheme } from "../Themes/theme";
import Carousel from "react-native-reanimated-carousel";
import ProjectManagerPreview from "../Discovery/MatchingProjectRole/ProjectManagerPreview";
import TeamMemberPreview from "../Discovery/MatchingProjectRole/TeamMemberPreview";
import Coins from "../Common/Coins";
import { Divider } from "react-native-paper";

type CompletedProjectViewerProps = {
  completedProject: ProjectCompletedDTO;
};

const CompletedProjectViewer: FC<CompletedProjectViewerProps> = ({
  completedProject,
}) => {
  const theme = useTheme();

  const renderItem = ({ item }: { item: MediaDTO }) => {
    return (
      <Media
        uri={item.uri}
        style={{
          width: "100%",
          height: 523,
          position: "absolute",
          zIndex: -1,
        }}
      />
    );
  };

  return (
    <ScrollView
      style={{
        ...styles.scrollContainer,
        backgroundColor: theme.colors.black,
      }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 200,
      }}
    >
      <View>
        <Media
          onPress={() => console.log("pressed")}
          uri={completedProject.medias[0].uri}
          style={styles.projectImage}
        />
        <LinearGradient
          colors={["transparent", "black"]}
          locations={[0.5, 0.75]}
          style={StyleSheet.absoluteFillObject}
        />
      </View>
      <Text
        style={{
          ...theme.customFonts.secondary.large,
          ...styles.title,
          color: theme.colors.white,
        }}
      >
        {completedProject.name}
      </Text>
      <Text
        style={{
          ...theme.customFonts.primary.medium,
          ...styles.description,
          color: theme.colors.white,
        }}
      >
        {completedProject.description}
      </Text>
      <Carousel
        width={windowWidth}
        vertical={false}
        loop={false}
        data={completedProject.experiencesMedias}
        renderItem={renderItem}
        height={523}
        panGestureHandlerProps={{
          activeOffsetX: [-3, 3],
          failOffsetY: [-5, 5],
        }}
      />
      <ProjectManagerPreview userInfo={completedProject.projectManager} />
      <View
        style={{
          backgroundColor: theme.colors.lightBlack,
          paddingHorizontal: 28,
          paddingVertical: 30,
        }}
      >
        <Text
          style={{
            ...theme.customFonts.primary.medium,
            marginBottom: 47,
            color: theme.colors.white,
          }}
        >
          Team
        </Text>
        {completedProject.projectRoles.map((role) => (
          <View key={role.id}>
            <TeamMemberPreview otherRole={role} />
            <Coins coins={role.cost} showShadow={false} />
            <Divider
              style={{
                marginVertical: 30,
              }}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default CompletedProjectViewer;

const styles = StyleSheet.create({
  scrollContainer: {},
  title: {
    position: "absolute",
    top: windowHeight * 0.8,
    alignSelf: "center",
    color: "white",
    fontWeight: "400",
  },
  projectImage: { 
    width: "100%",
    height: windowHeight + tabBarHeight,
    borderRadius: 17,
  },
  description: {
    fontWeight: "400",
    fontSize: 18,
    paddingHorizontal: "5%",
    marginBottom: 50,
  },
});
