import { ScrollViewWrapper } from "@/common/components/ScrollViewWrapper";
import { StyledTitle } from "@/common/components/StyledComponents/StyledTitle";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import { SkillAvailablityLocation } from "@/components/Main/Forms/EditProfile/SkillAvailablityLocation";
import { ProfilePictureUsernameDescription } from "@/components/Main/Forms/EditProfile/ProfilePictureUsernameDescription";
import { SubmitAndReturn } from "@/components/Main/Forms/NewProject/SubmitAndReturn";
import { Theme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { Portofolio } from "@/components/Main/Forms/EditProfile/Portofolio";
import { useFormContext } from "react-hook-form";
import { UserUpdateDTO } from "@/api/model";
import { useCallback } from "react";
import { usePutApiUser } from "@/api/endpoints/cocreateApi";

export default function Index() {
  const { t } = useTranslation();
  const styles = useThemedStyles(getStyles);

  const { mutate: updateUser } = usePutApiUser();

  const { handleSubmit } = useFormContext<UserUpdateDTO>();

  const onSubmit = useCallback(() => {
    handleSubmit(
      (data) => {
        console.log(data);
        // updateUser({ data });
      },
      (error) => {
        console.log(error);
      }
    )();
  }, [handleSubmit]);

  return (
    <ScrollViewWrapper
      disableTopInset
      contentContainerStyle={styles.container}
      header={<StyledTitle text={t("edit-profile.title")} />}
      StickyHeaderComponent={() => <SubmitAndReturn onSubmit={onSubmit} />}
    >
      <ProfilePictureUsernameDescription />
      <Portofolio />
      <SkillAvailablityLocation />
    </ScrollViewWrapper>
  );
}

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      gap: 26,
      paddingHorizontal: "4%",
    },
  });
