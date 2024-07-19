import { usePutApiUserLocation } from "@/common/api/endpoints/cocreateApi";
import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSetAddressState } from "../RecoilStates/profileState";
import { ProgressBar } from "react-native-paper";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useTheme } from "../Themes/theme";
import StyledButton from "../Common/StyledButton";
import { Controller, useForm } from "react-hook-form";
import { UserLocationUpdateDTO } from "@/common/api/model";
import { FormPageProps } from "@/common/forms/formsHelper";

const LocationForm: FC<FormPageProps> = ({ nextStep }) => {
  const theme = useTheme();

  const setAddress = useSetAddressState();

  const { setValue, control, getValues } = useForm<UserLocationUpdateDTO>();

  const { mutate } = usePutApiUserLocation({
    mutation: {
      onSuccess: (data) => {
        setAddress(data.address);
        nextStep?.();
      },
      onError: (error) => {
        console.log(error.code);
      },
    },
  });

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: "2%",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          gap: 20,
        }}
      >
        <Text
          style={{
            ...theme.customFonts.secondary.medium,
            fontWeight: "400",
            fontSize: 40,
          }}
        >
          {"Where Do You\nLive?"}
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
      </View>
      <StyledButton
        text="Next"
        onPress={() => {
          mutate({
            data: getValues(),
          });
        }}
        icon="arrow-right"
      />
    </View>
  );
};

export default LocationForm;

const styles = StyleSheet.create({
  titleTextInput: {
    fontSize: 25,
    textAlignVertical: "center",
    padding: 10,
    borderRadius: 7,
  },
});
