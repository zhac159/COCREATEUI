import { ProjectRoleDTO } from "@/common/api/model";
import FormFieldWrapper from "@/common/forms/FormFieldWrapper";
import { FormPageProps } from "@/common/forms/MultiStepForm";
import { useGetMediaCreateDTO } from "@/components/Account/Common/Media/mediaHelper";
import StyledButton from "@/components/Common/StyledButton";
import Media from "@/components/MediaViewer/Media";
import { FC } from "react";
import { Control, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";

type ProjectRoleFormMediaProps = {
  control: Control<ProjectRoleDTO>;
};

const ProjectRoleFormMedia: FC<ProjectRoleFormMediaProps & FormPageProps> = ({
  control,
  nextStep,
}) => {
  const getMedia = useGetMediaCreateDTO();
  const { t } = useTranslation();

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
        name="medias.0"
        control={control}
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
      <StyledButton text={t("button.next")} onPress={() => nextStep?.()} />
    </>
  );
};

export default ProjectRoleFormMedia;

const styles = StyleSheet.create({
  mainImage: {
    width: "100%",
    height: 380,
  },
});
