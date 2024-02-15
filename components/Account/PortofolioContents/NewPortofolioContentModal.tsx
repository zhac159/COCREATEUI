import { FileType, PostApiPortofolioContentBody } from "@/common/api/model";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { ActivityIndicator, Button, TextInput } from "react-native-paper";
import { usePostApiPortofolioContent } from "@/common/api/endpoints/cocreateApi";
import * as ImagePicker from "expo-image-picker";
import { StyleSheet } from "react-native";
import { useSetPortfolioContentsState } from "@/components/RecoilStates/profileState";
import { router } from "expo-router";

const PortofolioContentModal = () => {
  const { control, handleSubmit } = useForm<PostApiPortofolioContentBody>();

  const setPortfolioContents = useSetPortfolioContentsState();

  const { mutate, isLoading } = usePostApiPortofolioContent({
    mutation: {
      onSuccess: (data) => {
        console.log(data);
        setPortfolioContents((old) => {
          if (old) {
            return [...old, data];
          }
          return [data];
        });
        router.back();
      },
      onError: (error) => {
        console.log(error);
      },
    },
  });

  const onSubmit = (data: PostApiPortofolioContentBody) => {
    mutate({ data });
  };

  const handleChoosePhoto = async (onChange: any) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      onChange(result.assets[0].uri);
    }
  };

  return (
    <>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Description"
                style={styles.TextInput}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="PortofolioContent.Description"
            rules={{ required: true }}
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Name"
                style={styles.TextInput}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="PortofolioContent.Name"
            rules={{ required: true }}
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="FileType"
                style={styles.TextInput}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="PortofolioContent.FileType"
            rules={{ required: true }}
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Order"
                style={styles.TextInput}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                keyboardType="numeric"
              />
            )}
            name="PortofolioContent.Order"
            rules={{ required: true }}
          />
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Button onPress={() => handleChoosePhoto(onChange)}>
                Choose Photo
              </Button>
            )}
            name="MediaFile"
          />
          <Button mode="contained" onPress={handleSubmit(onSubmit)}>
            Submit
          </Button>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  card: {
    width: 200,
    margin: 10,
    height: 200,
  },
  TextInput: {
    width: 200,
    marginTop: 10,
  },
});

export default PortofolioContentModal;
