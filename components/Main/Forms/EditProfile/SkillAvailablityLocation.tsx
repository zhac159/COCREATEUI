import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Theme } from "@react-navigation/native";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import { Controller, useFormContext } from "react-hook-form";
import { ModalFormRedirectButton } from "@/common/components/Form/ModalFormRedirectButton";
import { useTranslation } from "react-i18next";
import { StyledDivider } from "@/common/components/StyledComponents/StyledDivider";
import { UserUpdateDTO } from "@/api/model";
import { StackPositions } from "@/common/constants/stackPostitions";

type SkillAvailablityLocationProps = {};

export const SkillAvailablityLocation: FC<
  SkillAvailablityLocationProps
> = ({}) => {
  const styles = useThemedStyles(getStyles);
  const { t } = useTranslation();

  const { control } = useFormContext<UserUpdateDTO>();

  return (
    <View>
      <Controller
        name={`skills`}
        control={control}
        render={({ field: { value } }) => (
          <ModalFormRedirectButton
            icon="location-dot"
            text={t("edit-profile.skills")}
            value={
              value
                ?.map((skill) => t(`skills.${skill.skillType}`))
                .join(", ") || ""
            }
            modalRoute={{
              pathname: "/main/(forms)/editProfile/skills",
            }}
            stackPosition={StackPositions.TOP}
          />
        )}
      />
      <StyledDivider contrast />
      <Controller
        name={`location`}
        control={control}
        render={({ field: { value } }) => (
          <ModalFormRedirectButton
            icon="location-dot"
            text={t("edit-profile.location")}
            value={value?.address}
            modalRoute={{
              pathname: "/main/(forms)/editProfile/location",
            }}
            stackPosition={StackPositions.BOTTOM}
          />
        )}
      />
    </View>
  );
};

const getStyles = (theme: Theme) => StyleSheet.create({});
