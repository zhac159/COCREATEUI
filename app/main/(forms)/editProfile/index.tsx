import { ScrollViewWrapper } from "@/common/components/ScrollViewWrapper";
import { StyledTitle } from "@/common/components/StyledComponents/StyledTitle";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import { SkillAvailablityLocation } from "@/components/Main/Forms/EditProfile/SkillAvailablityLocation";
import { ProfilePictureUsernameDescription } from "@/components/Main/Forms/EditProfile/ProfilePictureUsernameDescription";
import { SubmitAndReturn } from "@/components/Main/Forms/NewProject/SubmitAndReturn";
import { Theme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { useFormContext } from "react-hook-form";
import { UserUpdateDTO } from "@/api/model";
import { useCallback } from "react";
import { usePutApiUser } from "@/api/endpoints/cocreateApi";
import { useUploadMedia } from "@/common/hooks/useUploadMedia";
import { EntityType } from "@/common/types/entityTypes";
import { Portfolio } from "@/components/Main/Forms/EditProfile/Portfolio";

export default function Index() {
  const { t } = useTranslation();
  const styles = useThemedStyles(getStyles);

  const { mutate: updateUser, isPending } = usePutApiUser();
  const { uploadMedias } = useUploadMedia(EntityType.PROJECTROLE);

  const { handleSubmit } = useFormContext<UserUpdateDTO>();

  const onSubmit = useCallback(() => {
    handleSubmit(
      async (data) => {
        await uploadMedias(data.portfolioMedias);
        await uploadMedias([data.profilePicture]);
        updateUser({ data });
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
      StickyHeaderComponent={() => (
        <SubmitAndReturn
          onSubmit={onSubmit}
          isSubmitting={isPending}
          title={t("edit-profile.update")}
        />
      )}
    >
      <ProfilePictureUsernameDescription />
      <Portfolio />
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
