import { Coins } from "@/common/components/Coins";
import { ProfilePicture } from "@/common/components/ProfilePicture";
import StyledButton from "@/common/components/StyledComponents/StyledButton";
import StyledText from "@/common/components/StyledComponents/StyledText";
import { useAuthStore } from "@/common/stores/authStore/authStore";
import { router } from "expo-router";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View, ViewProps } from "react-native";

type EditAccountAndInfoProps = ViewProps & {};

export const EditAccountAndInfo: FC<EditAccountAndInfoProps> = ({
  style,
  ...props
}) => {
  const { t } = useTranslation();

  const userName = useAuthStore((state) => state.auth.username);
  const profilePicture = useAuthStore((state) => state.auth.profilePicture);

  return (
    <View style={[styles.editAccountAndInfo, style]} {...props}>
      <View style={styles.nameButtonContainer}>
        <StyledText text={userName} style={styles.name} secondary />
        <StyledButton
          text={t("account.edit-profile-button")}
          style={styles.editButton}
          onPress={() =>
            router.push({
              pathname: "/main/(forms)/editProfile",
            })
          }
          icon="pen"
        />
      </View>
      <View>
        <Coins value={500} style={styles.coins} />
      </View>
      <ProfilePicture uri={profilePicture} style={styles.profilePicture} />
    </View>
  );
};

const styles = StyleSheet.create({
  name: {
    fontSize: 25,
    fontWeight: "400",
    textAlign: "right",
  },
  editAccountAndInfo: {
    flexDirection: "row",
    paddingTop: 10,
    gap: 20,
  },
  nameButtonContainer: {
    gap: 10,
  },
  editButton: {
    alignSelf: "flex-end",
    paddingHorizontal: 10,
  },
  coins: {
    marginTop: 40,
  },
  profilePicture: {
    position: "absolute",
    right: 10,
    zIndex: -1,
  },
});
