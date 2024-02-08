import { FC } from "react";
import { AssetType } from "./assetHelper";
import { Controller, useForm } from "react-hook-form";
import { PostApiAssetBody } from "@/common/api/model";
import { Button, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { usePostApiAsset } from "@/common/api/endpoints/cocreateApi";
import { useAssetsState } from "@/components/RecoilStates/profileState";
import { router } from "expo-router";

const handleChoosePhoto = async (onChange: any) => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    onChange(result.assets[0].uri);
  }
};

type newAssetFormProps = {
  assetType: AssetType | undefined;
};

const NewAssetForm: FC<newAssetFormProps> = ({ assetType }) => {
  const { control, handleSubmit } = useForm<PostApiAssetBody>();

  const [assets, setAssets] = useAssetsState();

  const { mutate, isLoading } = usePostApiAsset({
    mutation: {
      onSuccess: (data) => {
        setAssets((old) => {
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

  const onSubmit = (data: PostApiAssetBody) => {
    mutate({ data: { ...data, "Asset.AssetType": assetType } });
  };

  return (
    <>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            onChangeText={onChange}
            value={value}
            placeholder="Asset Description"
          />
        )}
        name="Asset.Description"
      />
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            onChangeText={onChange}
            value={value}
            placeholder="Asset Name"
          />
        )}
        name="Asset.Name"
      />
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Button
            onPress={() => handleChoosePhoto((uri: string) => onChange(uri))}
          >
            Choose Photo for MediaFile 0
          </Button>
        )}
        name="MediaFiles.0"
      />
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Button
            onPress={() => handleChoosePhoto((uri: string) => onChange(uri))}
          >
            Choose Photo for MediaFile 1
          </Button>
        )}
        name="MediaFiles.1"
      />
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Button
            onPress={() => handleChoosePhoto((uri: string) => onChange(uri))}
          >
            Choose Photo for MediaFile 2
          </Button>
        )}
        name="MediaFiles.2"
      />
      <Button mode="contained" onPress={handleSubmit(onSubmit)} loading={isLoading} >
        Submit
      </Button>
    </>
  );
};

export default NewAssetForm;
