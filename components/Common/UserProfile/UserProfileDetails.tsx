import React, { FC } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { useTheme } from "../../Themes/theme";
import UserProfileDetailsNumbers from "./UserProfileDetailsNumbers";
import { FontAwesome6 } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

type UserProfileDetailsProps = {
  username: string;
  rating: number;
  rolesWorked: number;
  projectsCommisioned: number;
};

const UserProfileDetails: FC<UserProfileDetailsProps> = ({
  username,
  rating,
  rolesWorked,
  projectsCommisioned,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <View style={{ ...styles.container }}>
      <Text
        style={{
          ...theme.customFonts.secondary.large,
          fontSize: 32,
          fontWeight: "400",
        }}
      >
        {username}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
          width: "65%",
        }}
      >
        <UserProfileDetailsNumbers
          value={rolesWorked}
          text={t("account.account-viewer.roles-worked")}
        />
        <UserProfileDetailsNumbers
          value={projectsCommisioned}
          text={t("account.account-viewer.projects-commissioned")}
        />
        <UserProfileDetailsNumbers
          value={rating}
          text={
            <FontAwesome6
              name="star"
              size={17}
              color={theme.colors.black}
              solid
            />
          }
        />
      </View>
    </View>
  );
};

export default UserProfileDetails;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    marginTop: 100,
  },
});
