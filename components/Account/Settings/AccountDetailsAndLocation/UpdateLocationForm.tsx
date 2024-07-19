import { usePutApiUserLocation } from "@/common/api/endpoints/cocreateApi";
import { UserLocationDTO, UserLocationUpdateDTO } from "@/common/api/model";
import { useTheme } from "@/components/Themes/theme";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { StyleSheet } from "react-native";
import { View, Text } from "react-native-animatable";
import StyledButton from "@/components/Common/StyledButton";

export function UpdateLocationForm() {
  const theme = useTheme();
  const { t } = useTranslation();

  const { mutate, isLoading, error } = usePutApiUserLocation();

  const { setValue, control, getValues, handleSubmit } =
    useForm<UserLocationUpdateDTO>();

  return (
    <View style={styles.container}>
      <Text
        style={{
          ...theme.customFonts.primary.medium,
          fontSize: 25,
        }}
      >
        {t(
          "account.settings.account-details-and-location.change-location.title"
        )}
      </Text>
      <Controller
        control={control}
        name="address"
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <GooglePlacesAutocomplete
            placeholder="Location ..."
            minLength={2}
            isRowScrollable={false}
            disableScroll
            fetchDetails={true}
            onPress={(data, details = null) => {
              if (details == null) {
                return;
              }
              console.log(details);
              onChange(details.formatted_address);
              setValue("latitude", details.geometry.location.lat);
              setValue("longitude", details.geometry.location.lng);
            }}
            textInputProps={{
              onChangeText: (text) => onChange(text),
              value: value,
              onBlur: onBlur,
            }}
            query={{
              key: "AIzaSyAFNo96X4pNPMF8A7u8XwzrHPXagPsXU2Q",
              language: "en",
            }}
            styles={{
              container: {
                justifyContent: "center",
                flex: 0,
              },
              textInputContainer: {
                backgroundColor: "transparent",
                width: "100%",
              },
              textInput: {
                ...theme.customFonts.primary.medium,
                ...styles.titleTextInput,
                backgroundColor: theme.colors.lightGray,
                color: theme.colors.black,
                height: 50,
              },
              listView: {
                backgroundColor: "white",
              },
            }}
          />
        )}
      />
      <StyledButton
        text={t("button.submit")}
        onPress={handleSubmit((data) => {
          mutate({ data });
        })}
        style={{ backgroundColor: theme.colors.primary }}
        isLoading={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  titleTextInput: {
    fontSize: 25,
    textAlignVertical: "center",
    padding: 10,
    borderRadius: 7,
  },
  container: {
    gap: 25,
    paddingHorizontal: 20,
  },
});
