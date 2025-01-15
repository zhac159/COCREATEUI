import { FC, useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import { Theme } from "@react-navigation/native";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from "react-native-google-places-autocomplete";
import StyledIconButton from "../StyledComponents/StyledIconButton";
import { LocationDTO } from "@/api/model";

const key = "AIzaSyCvL8lvdZs6yrwTsk4KOnPEVP3rf-KQAvk";

type LocationFormFieldProps = {
  value: LocationDTO;
  onChange: (value: LocationDTO) => void;
};

export const LocationFormField: FC<LocationFormFieldProps> = ({
  onChange,
  value,
}) => {
  const styles = useThemedStyles(getStyles);

  const ref = useRef<GooglePlacesAutocompleteRef>(null);

  useEffect(() => {
    if (value?.address) ref.current?.setAddressText(value.address);
  }, []);

  return (
    <GooglePlacesAutocomplete
      ref={ref}
      placeholder="Search destination"
      minLength={2}
      fetchDetails
      onPress={(data, details) => {
        if (details)
          onChange({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            address: data.description,
          });
      }}
      styles={styles}
      renderRightButton={() => (
        <StyledIconButton
          iconName="magnifying-glass"
          style={styles.iconBackground}
          iconStyle={styles.icon}
        />
      )}
      query={{
        key: key,
        language: "en",
      }}
    />
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: "100%",
    },
    textInputContainer: {
      backgroundColor: theme.colors.backgroundColor,
      borderRadius: 11,
    },
    textInput: {
      backgroundColor: "transparent",
      ...theme.customFonts.primary.medium,
    },
    iconBackground: {
      backgroundColor: theme.colors.backgroundColor,
    },
    icon: {
      color: theme.colors.black,
    },
  });
