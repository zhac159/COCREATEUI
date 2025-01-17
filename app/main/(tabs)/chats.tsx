  import { ScrollViewWrapper } from "@/common/components/ScrollViewWrapper";
  import { StyledTitle } from "@/common/components/StyledComponents/StyledTitle";
  import useThemedStyles from "@/common/theme/getThemedStylesheet";
  import { Theme } from "@react-navigation/native";
  import { useTranslation } from "react-i18next";
  import { StyleSheet } from "react-native";
  
  export default function Chats() {
    const { t } = useTranslation();
    const styles = useThemedStyles(getStyles);
  
    return (
      <ScrollViewWrapper
        contentContainerStyle={styles.container}
      >
        <StyledTitle text={t("account.you-commissioned-projets")} />
      </ScrollViewWrapper>
    );
  }
  
  const getStyles = (theme: Theme) =>
    StyleSheet.create({
      container: {
        gap: 20,
      },
      editAccountAndInfoStyles: {
        alignSelf: "flex-end",
      },
      button: {
        borderRadius: 10,
      },
    });
  