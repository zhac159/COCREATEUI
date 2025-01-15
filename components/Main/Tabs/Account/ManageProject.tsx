import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Theme } from "@react-navigation/native";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import { ProjectInfoDTO } from "@/api/model";
import StyledText from "@/common/components/StyledComponents/StyledText";
import StyledButton from "@/common/components/StyledComponents/StyledButton";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";

type ManageProjectProps = {
  projectInfo: ProjectInfoDTO;
};

export const ManageProject: FC<ManageProjectProps> = ({ projectInfo }) => {
  const { t } = useTranslation();
  const styles = useThemedStyles(getStyles);
  return (
    <View style={styles.container}>
      <StyledText
        style={styles.text}
        text={"The Man and The Hound"}
        ellipsizeMode="tail"
        numberOfLines={2}
      />
      <StyledButton
        text={t("account.manage-project")}
        style={styles.button}
        icon="pen"
        onPress={() => router.push("/main/(forms)/newProject")}
      />
    </View>
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: "100%",
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    editAccountAndInfoStyles: {
      alignSelf: "flex-end",
    },
    text: {
      color: theme.colors.black,
      fontSize: 24,
      fontWeight: "700",
      width: "40%",
    },
    button: {
      maxWidth: "50%",
      borderRadius: 10,
      paddingHorizontal: 12,
      paddingVertical: 9,
      backgroundColor: theme.colors.black,
    },
  });
