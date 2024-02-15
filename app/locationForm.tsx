import { usePutApiUserLocation } from "@/common/api/endpoints/cocreateApi";
import { useSetAddressState } from "@/components/RecoilStates/profileState";
import { router } from "expo-router";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { ProgressBar } from "react-native-paper";

export default function LocationForm() {
  const setAddress = useSetAddressState();

  const { mutate, isLoading } = usePutApiUserLocation({
    mutation: {
      onSuccess: (data) => {
        router.replace("/account");
        setAddress(data.address);
      },
      onError: (error) => {
        console.log(error.code);
      },
    },
  });

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red",
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: "10%",
        }}
      >
        {isLoading ? (
          <View style={{ height: 50, width: "100%" }}>
            <ProgressBar indeterminate={true} color={"#0000ff"} />
          </View>
        ) : (
          <GooglePlacesAutocomplete
            placeholder="Enter Location"
            minLength={2}
            fetchDetails={true}
            onPress={(data, details = null) => {
              if (details == null) {
                return;
              }
              mutate({
                data: {
                  address: details.formatted_address,
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                },
              });
            }}
            query={{
              key: "AIzaSyDxcKLuYiGnKpesxd2Ifoz-aNzDXNk3B4g",
              language: "en",
            }}
            styles={{
              container: {
                marginTop: 200,
              },
              textInputContainer: {
                backgroundColor: "white",
                width: "100%",
              },
              textInput: {
                height: 38,
                color: "#5d5d5d",
                fontSize: 16,
                backgroundColor: "white",
              },
              listView: {
                backgroundColor: "whitw",
              },
            }}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
