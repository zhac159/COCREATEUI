import { ProjectCreateDTO } from "@/common/api/model";
import FormFieldWrapper from "@/common/forms/FormFieldWrapper";
import { FormPageProps } from "@/common/forms/MultiStepForm";
import { useGetMediaCreateDTO } from "@/components/Account/Common/Media/mediaHelper";
import StyledButton from "@/components/Common/StyledButton";
import useThemedStyles from "@/components/Common/StyledComponents/hooks/useThemedStyles";
import Media from "@/components/MediaViewer/Media";
import CustomTheme from "@/components/Themes/themeType";
import { FC } from "react";
import { Control, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";

type ProjectCreateMediasProps = {
  control: Control<ProjectCreateDTO>;
};

const ProjectCreateMedias: FC<ProjectCreateMediasProps & FormPageProps> = ({
  control,
  nextStep,
  hasError,
}) => {
  const { t } = useTranslation();
  const getMedia = useGetMediaCreateDTO();

  const styles = useThemedStyles(getStyles);

  return (
    <>
      <Controller
        control={control}
        name="medias"
        render={({ fieldState: { error } }) => (
          <FormFieldWrapper error={error?.root?.message} />
        )}
      />
      <Controller
        control={control}
        name="medias.0"
        render={({ field: { onChange, value } }) => (
          <Media
            onPress={async () => {
              const mediaCreate = await getMedia();
              if (mediaCreate) {
                onChange(mediaCreate);
              }
            }}
            uri={value?.uri}
            style={styles.mainImage}
            editMode={true}
          />
        )}
      />
      <Controller
        control={control}
        name="medias.1"
        render={({ field: { onChange, value } }) => (
          <Media
            onPress={async () => {
              const mediaCreate = await getMedia();
              if (mediaCreate) {
                onChange(mediaCreate);
              }
            }}
            uri={value?.uri}
            style={styles.mainImage}
            editMode={true}
          />
        )}
      />
      <StyledButton
        text={t("button.done")}
        onPress={() => nextStep?.()}
        style={hasError ? styles.errorButton : styles.button}
      />
    </>
  );
};

export default ProjectCreateMedias;

const getStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    mainImage: {
      width: "100%",
      height: 380,
    },
    button: {
      backgroundColor: theme.colors.primary,
    },
    errorButton: {
      backgroundColor: theme.colors.red,
    },
  });
