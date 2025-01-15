import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Theme } from "@react-navigation/native";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import { Controller, useFormContext } from "react-hook-form";
import { ProjectCreateDTO } from "@/api/model";
import { StyledTextInput } from "@/common/components/StyledComponents/StyledTextInput";
import { useTranslation } from "react-i18next";

type ProjectRoleFormProps = {
  index: number;
};

export const ProjectRoleForm: FC<ProjectRoleFormProps> = ({ index }) => {
  const styles = useThemedStyles(getStyles);
  const { t } = useTranslation();
  const { control } = useFormContext<ProjectCreateDTO>();
  return (
    <View>
      <Controller
        name={`projectRoles.${index}.name`}
        control={control}
        render={({ field }) => (
          <StyledTextInput
            label={t("new-project.new-role.title")}
            placeholder={t("new-project.new-role.title-placeholder")}
            onChangeText={field.onChange}
            value={field.value}
          />
        )}
      />
    </View>
  );
};

const getStyles = (theme: Theme) => StyleSheet.create({});
