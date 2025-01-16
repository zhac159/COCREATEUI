import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Theme } from "@react-navigation/native";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import { Controller, useFormContext } from "react-hook-form";
import { ProjectUpdateDTO } from "@/api/model";
import { StyledTextInput } from "@/common/components/StyledComponents/StyledTextInput";
import { useTranslation } from "react-i18next";
import { ModalFormRedirectButton } from "@/common/components/Form/ModalFormRedirectButton";
import { StackPositions } from "@/common/constants/stackPostitions";
import { StyledDivider } from "@/common/components/StyledComponents/StyledDivider";
import { DeleteButton } from "@/common/components/DeleteButton";
import { generalPadding } from "@/common/constants/generalPadding";

type ProjectRoleFormProps = {
  index: number;
};

export const ProjectRoleForm: FC<ProjectRoleFormProps> = ({ index }) => {
  const styles = useThemedStyles(getStyles);
  const { t } = useTranslation();
  const { control } = useFormContext<ProjectUpdateDTO>();
  return (
    <View style={styles.container}>
      <Controller
        name={`projectRoles`}
        control={control}
        render={({ field }) => (
          <DeleteButton
            onPress={() => {
              field.onChange(field.value.filter((_, i) => i !== index));
            }}
            style={styles.deleteButton}
          />
        )}
      />
      <Controller
        name={`projectRoles.${index}.name`}
        control={control}
        render={({ field }) => (
          <StyledTextInput
            label={t("new-project.new-role.title")}
            placeholder={t("new-project.new-role.title-placeholder")}
            onChangeText={field.onChange}
            value={field.value}
            style={styles.titleTextInput}
          />
        )}
      />
      <Controller
        name={`projectRoles.${index}.description`}
        control={control}
        render={({ field }) => (
          <StyledTextInput
            label={t("new-project.new-role.description")}
            multiline
            numberOfLines={10}
            placeholder={t("new-project.new-role.description-placeholder")}
            onChangeText={field.onChange}
            style={styles.descriptionTextContainer}
            value={field.value}
          />
        )}
      />
      <View>
        <Controller
          name={`projectRoles.${index}.skillType`}
          control={control}
          render={({ field: { value } }) => (
            <ModalFormRedirectButton
              icon="location-dot"
              text={t("new-project.new-role.skill")}
              value={t(`skills.${value}`)}
              style={styles.modelRedirectButton}
              modalRoute={{
                pathname: "/main/(forms)/newProject/skill",
                params: { roleIndex: index.toString() },
              }}
              stackPosition={StackPositions.TOP}
            />
          )}
        />
        <StyledDivider contrast />
        <Controller
          name={`projectRoles.${index}.cost`}
          control={control}
          render={({ field: { value } }) => (
            <ModalFormRedirectButton
              icon="calendar"
              text={t("new-project.new-role.payment")}
              value={value.toString()}
              style={styles.modelRedirectButton}
              modalRoute={{
                pathname: "/main/(forms)/newProject/payment",
                params: { roleIndex: index.toString() },
              }}
              stackPosition={StackPositions.BOTTOM}
            />
          )}
        />
      </View>
    </View>
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: generalPadding,
      backgroundColor: theme.colors.white,
      elevation: 2,
      gap: 26,
      borderRadius: 30,
      paddingVertical: 23,
    },
    titleTextInput: {
      backgroundColor: theme.colors.backgroundColor,
    },
    descriptionContainer: {
      paddingVertical: 10,
      minHeight: 200,
    },
    descriptionTextContainer: {
      backgroundColor: theme.colors.backgroundColor,
      paddingVertical: 10,
      minHeight: 200,
    },
    modelRedirectButton: {
      backgroundColor: theme.colors.backgroundColor,
    },
    deleteButton: {
      position: "absolute",
      top: -5,
      right: -5,
      zIndex: 100,
    },
  });
