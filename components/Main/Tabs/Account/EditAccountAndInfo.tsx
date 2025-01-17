import { Coins } from "@/common/components/Coins";
import StyledButton from "@/common/components/StyledComponents/StyledButton";
import { StyledImage } from "@/common/components/StyledComponents/StyledImage";
import StyledText from "@/common/components/StyledComponents/StyledText";
import { useAuthStore } from "@/common/stores/authStore";
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

  return (
    <View style={[styles.editAccountAndInfo, style]} {...props}>
      <StyledImage
        source={{ uri: "https://picsum.photos/200/300" }}
        style={styles.profilePicture}
      />
      <View style={styles.nameButtonContainer}>
        <StyledText text={"auth.username"} style={styles.name} secondary />
        <StyledButton
          text={t("account.edit-profile")}
          style={styles.editButton}
          onPress={() => console.log("Edit Account")}
          icon="pen"
        />
      </View>
      <View>
        <Coins value={500} style={styles.coins} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  name: {
    fontSize: 25,
    fontWeight: "400",
  },
  editAccountAndInfo: {
    flexDirection: "row",
    gap: 20,
    paddingTop: 10,
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
    borderRadius: 50,
    height: 85,
    width: 85,
    position: "absolute",
    right: 25,
  },
});
