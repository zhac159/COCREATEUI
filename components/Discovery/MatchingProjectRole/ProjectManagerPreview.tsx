import { UserInformationDTO } from "@/common/api/model";
import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../Themes/theme";
import Rating from "@/components/Common/Rating";
import SeeProfileButton from "@/components/Common/SeeProfileButton";
import BackgroundColourAnimation from "@/components/Account/BackgroundColourAnimation";

type ProjectManagerPreviewProps = {
  userInfo: UserInformationDTO | undefined;
};

const ProjectManagerPreview: FC<ProjectManagerPreviewProps> = ({
  userInfo,
}) => {
  const theme = useTheme();

  return (
    <View style={{ ...styles.container, overflow: "hidden" }}>
      <BackgroundColourAnimation hideBlur />
      <Text
        style={{
          ...theme.customFonts.primary.medium,
          color: theme.colors.white,
        }}
      >
        Creator
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            gap: 10,
          }}
        >
          <Text
            style={{
              ...theme.customFonts.secondary.large,
              color: theme.colors.white,
              fontWeight: "400",
              fontSize: 32,
              paddingTop: 30,
            }}
          >
            {userInfo?.username || "N/A"}
          </Text>
          <Rating rating={30} white />
        </View>
        <SeeProfileButton userId={userInfo?.userId} />
      </View>
    </View>
  );
};

export default ProjectManagerPreview;

const styles = StyleSheet.create({
  container: {
    paddingTop: 33,
    paddingBottom: 55,
    paddingHorizontal: 28,
  },
  ProjectManagerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ProjectManagerInfoContainer: {
    marginLeft: 10,
  },
});
