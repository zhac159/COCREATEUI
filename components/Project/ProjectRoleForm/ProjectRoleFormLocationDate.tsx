import { ProjectRoleDTO } from "@/common/api/model";
import {
  Control,
  Controller,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { FC, useRef } from "react";
import { FormPageProps } from "@/common/forms/MultiStepForm";
import { useTranslation } from "react-i18next";
import FormFieldWrapper from "@/common/forms/FormFieldWrapper";
import FormIconFieldWrapper from "@/common/forms/FormIconFieldWrapper";
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from "react-native-google-places-autocomplete";
import CustomTheme from "@/components/Themes/themeType";
import { StyleSheet } from "react-native";
import useThemedStyles from "@/components/Common/StyledComponents/hooks/useThemedStyles";
import FromToDatePicker from "@/components/Common/Forms/FromToDatePicker";
import StyledButton from "@/components/Common/StyledButton";
import DurationPicker from "@/components/Common/Forms/DurationPicker";
import { useTheme } from "@/components/Themes/theme";

type ProjectRoleLocationDateProps = {
  control: Control<ProjectRoleDTO>;
  watch: UseFormWatch<ProjectRoleDTO>;
  setValue: UseFormSetValue<ProjectRoleDTO>;
  hours: boolean;
  setHours: (hours: boolean) => void;
};

const ProjectRoleLocationDate: FC<
  ProjectRoleLocationDateProps & FormPageProps
> = ({ control, nextStep, setValue, watch, hours, setHours }) => {
  const ref = useRef<GooglePlacesAutocompleteRef>(null);
  const theme = useTheme();
  const styles = useThemedStyles(getStyles);
  const { t } = useTranslation();

  return (
    <>
      <Controller
        control={control}
        name="address"
        render={({ fieldState: { error } }) => (
          <FormFieldWrapper error={error?.message}>
            <FormIconFieldWrapper
              iconName="location-dot"
              title={t("projects.add-role.location-title")}
            >
              <GooglePlacesAutocomplete
                ref={ref}
                placeholder="Enter Location"
                fetchDetails={true}
                onPress={(_, details) => {
                  if (details) {
                    ref.current?.setAddressText(details.formatted_address);
                    setValue("address", details.formatted_address);
                    setValue("latitude", details.geometry.location.lat);
                    setValue("longitude", details.geometry.location.lng);
                  }
                }}
                query={{
                  key: "AIzaSyAFNo96X4pNPMF8A7u8XwzrHPXagPsXU2Q",
                  language: "en",
                }}
                styles={{
                  container: {
                    marginTop: "5%",
                    width: "100%",

                  },
                  textInput: {
                    styles: styles.formTextInput,
                    backgroundColor: theme.colors.lightGray,

                  },
                  listView: {
                    position: "absolute",
                    marginTop: 45,
                    width: "100%",
                  },
                }}
              />
            </FormIconFieldWrapper>
          </FormFieldWrapper>
        )}
      />
      <Controller
        control={control}
        name="startDate"
        render={({ fieldState: { error } }) => (
          <FormFieldWrapper error={error?.message}>
            <FormIconFieldWrapper
              iconName="calendar"
              title={t("projects.add-role.location-title")}
            >
              <FromToDatePicker
                startDate={new Date(watch("startDate"))}
                onStartDateSelect={(date) =>
                  setValue("startDate", date.toISOString())
                }
                endDate={new Date(watch("endDate"))}
                onEndDateSelect={(date) =>
                  setValue("endDate", date.toISOString())
                }
              />
            </FormIconFieldWrapper>
          </FormFieldWrapper>
        )}
      />
      <Controller
        control={control}
        name="effort"
        render={({ fieldState: { error }, field: { value, onChange } }) => (
          <FormFieldWrapper error={error?.message}>
            <FormIconFieldWrapper
              iconName="calendar"
              title={t("projects.add-role.location-title")}
            >
              <DurationPicker
                duration={value}
                onDurationChange={onChange}
                hours={hours}
                setHours={setHours}
              />
            </FormIconFieldWrapper>
          </FormFieldWrapper>
        )}
      />
      <StyledButton text={t("button.next")} onPress={() => nextStep?.()} />
    </>
  );
};

export default ProjectRoleLocationDate;

const getStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    formTextInput: {
      ...theme.customFonts.primary.medium,
      color: theme.colors.black,
      borderRadius: 7,
      padding: 10,
      width: "100%",
    },
  });
