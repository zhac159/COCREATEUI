import { useTheme } from "@/components/Themes/theme";
import { FontAwesome6 } from "@expo/vector-icons";
import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";
import { ScrollView, Text, View } from "react-native";
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from "react-native-google-places-autocomplete";
import projectAddRoleWhenWhereHowLongStyles from "./projectAddRoleWhenWhereHowLongStyles";
import { Checkbox } from "react-native-paper";
import { LogBox } from 'react-native';
import { Skills, getSkillGroupColor, skillGroupMap } from "@/components/Account/Skills/skillHelper";

LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

type ProjectAddRoleWhereProps = {
  longitude: number;
  setLongitude: Dispatch<SetStateAction<number>>;
  latitude: number;
  setLatitude: Dispatch<SetStateAction<number>>;
  address: string;
  setAddress: Dispatch<SetStateAction<string>>;
  remote: boolean;
  setRemote: Dispatch<SetStateAction<boolean>>;
  skill: Skills | undefined;
};

const ProjectAddRoleWhere: FC<ProjectAddRoleWhereProps> = ({
  longitude,
  setLongitude,
  latitude,
  setLatitude,
  address,
  setAddress,
  remote,
  setRemote,
  skill,
}) => {
  
  const theme = useTheme();
  const ref = useRef<GooglePlacesAutocompleteRef>(null);

  useEffect(() => {
    ref.current?.setAddressText(address);
  }, []);
    
  const skillGroupType = skillGroupMap[skill || 0];
  const color = skill === undefined ? theme.colors.lightestGray:getSkillGroupColor(skillGroupType, 0.12);

  return (
    <>
      <View
        style={{
          ...projectAddRoleWhenWhereHowLongStyles.formElementContainer,
          backgroundColor: theme.colors.white,
        }}
      >
        <View
          style={projectAddRoleWhenWhereHowLongStyles.formElementTitleContainer}
        >
          <FontAwesome6
            name="location-dot"
            style={projectAddRoleWhenWhereHowLongStyles.formElementTitleIcon}
          />
          <Text
            style={{
              ...theme.customFonts.primary.large,
              fontSize: 17,
            }}
          >
            Production Location
          </Text>
        </View>
        <GooglePlacesAutocomplete
          ref={ref}
          placeholder="Enter Location"
          minLength={2}
          fetchDetails={true}
          onPress={(data, details = null) => {
            if (details == null) {
              return;
            }
            setLongitude(details.geometry.location.lng);
            setLatitude(details.geometry.location.lat);
            setAddress(details.formatted_address);
          }}
          query={{
            key: "AIzaSyDxcKLuYiGnKpesxd2Ifoz-aNzDXNk3B4g",
            language: "en",
          }}
          styles={{
            container: {
              marginTop: "5%",
              width: "100%",
            },
            listView: {
              position: "absolute",
              marginTop: 45,
              width: "100%",
            },
            textInput: {
              ...theme.customFonts.primary.medium,
              backgroundColor: color,
              color: theme.colors.black,
              borderRadius: 7,
              padding: 10,
              width: "100%",
            },
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "flex-end",
            position: "absolute",
            bottom: 10,
            paddingRight: 18,
            zIndex: -1,
          }}
        >
          <Text
            style={{
              ...theme.customFonts.primary.medium,
              fontSize: 17,
            }}
          >
            Remote work possible
          </Text>
          <Checkbox.Android
            status={remote ? "checked" : "unchecked"}
            onPress={() => {
              setRemote(!remote);
            }}
            uncheckedColor={theme.colors.black}
            color={theme.colors.black}
          />
        </View>
      </View>
    </>
  );
};

export default ProjectAddRoleWhere;
