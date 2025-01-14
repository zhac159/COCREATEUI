import { FC } from "react";
import { StyleSheet } from "react-native";
import { Theme } from "@react-navigation/native";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const key = "AIzaSyCvL8lvdZs6yrwTsk4KOnPEVP3rf-KQAvk";
type LocationFormFieldProps = {
  // value: LocationDTO;
  // onChange: (value: LocationDTO) => void;
};

export const LocationFormField: FC<LocationFormFieldProps> = ({}) => {
  const styles = useThemedStyles(getStyles);

  return (
    <GooglePlacesAutocomplete
      placeholder="Search destination"
      minLength={2}
      onPress={(data, details = null) => {
        console.log(data, details);
      }}
      query={{
        key: key,
        language: "en",
      }}
    />
  );
};

const getStyles = (theme: Theme) => StyleSheet.create({});
