import { UserProfileDTO } from "@/common/api/model";
import { FC } from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "../../Themes/theme";
import {
  tabBarHeight,
  windowHeight,
} from "../../Account/Common/getWindowDimensions";
import { ScrollView } from "react-native-gesture-handler";
import { TouchableWithoutFeedback } from "react-native";
import UserProfileDetails from "./UserProfileDetails";

type UserProfileProps = {
  userProfile: UserProfileDTO;
};

const UserProfile: FC<UserProfileProps> = ({ userProfile }) => {
  const theme = useTheme();

  return (
    <View style={{ ...styles.container, backgroundColor: theme.colors.white }}>
      <ScrollView style={styles.scrollContainer}>
        <TouchableWithoutFeedback>
          <View>
            <UserProfileDetails
              username={"AbithaMaha"}
              rating={4.8}
              rolesWorked={4}
              projectsCommisioned={32}
            />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </View>
  );
};

export default UserProfile;

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
