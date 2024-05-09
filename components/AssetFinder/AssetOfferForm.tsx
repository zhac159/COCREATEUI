import { AssetDTO, AssetOfferCreateDTO } from "@/common/api/model";
import React, { FC, useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { BlurView } from "@react-native-community/blur";
import { useTheme } from "../Themes/theme";
import FromToDatePicker from "../Common/Forms/FromToDatePicker";
import DurationPicker from "../Common/Forms/DurationPicker";
import { de } from "@faker-js/faker";
import ButtonWithIcon from "../Common/ButtonWithIcon";
import { usePostApiAssetOfferCreate } from "@/common/api/endpoints/cocreateApi";
import { router } from "expo-router";
import { useSetProjectByIdState } from "../RecoilStates/profileState";
import { createAndExchangeKeys } from "@/common/encryption/encryptionHelper";
import { ChatType } from "../Chats/ChatHelper";
import { ConnectionContext } from "@/app/main/_layout";

type AssetOfferFormProps = {
  asset: AssetDTO;
  projectId: number;
  show: boolean;
};

const AssetOfferForm: FC<AssetOfferFormProps> = ({
  asset,
  projectId,
  show,
}) => {
  const theme = useTheme();

  const setProject = useSetProjectByIdState(projectId);
  
  const connection = useContext(ConnectionContext);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [duration, setDuration] = useState(0);
  const [hours, setHours] = useState(true);
  const [cost, setCost] = useState(0);
  const [description, setDescription] = useState("");

  const { mutate: sendOffer } = usePostApiAssetOfferCreate({
    mutation: {
      onSuccess: (data) => {
        router.back();
        setProject((state) => {
          if (!state) return state;

          const newAssetOffers = state.assetOffers
            ? [...state.assetOffers, data]
            : [data];

          return {
            ...state,
            assetOffers: newAssetOffers,
          };
        });

        createAndExchangeKeys(
          data.asset!.owner!.publicKey || "",
          data.asset!.owner!.userId || 0,
          ChatType.AssetEnquiry,
          connection
        );
      },
      onError: (error) => {
        console.log(error);
      },
    },
  });

  const handleSendOffer = () => {
    const offer: AssetOfferCreateDTO = {
      assetId: asset.id,
      projectId,
      assetUsageStartTime: startDate.toISOString(),
      assetUsageEndTime: endDate.toISOString(),
      duration,
      offerValue: cost,
      description,
    };

    sendOffer({ data: offer });
  };

  if (!show) return null;

  return (
    <>
      <BlurView
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
        blurType="regular"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
      />
      <View
        style={{
          position: "absolute",
          height: "100%",
          paddingVertical: "30%",
          width: "100%",
          paddingHorizontal: 16,
          gap: 30,
        }}
      >
        <Text
          style={{
            ...theme.customFonts.primary.medium,
            color: theme.colors.iconGray,
            fontSize: 23,
          }}
        >
          Offer for Project:
        </Text>
        <Text
          style={{
            ...theme.customFonts.primary.medium,
            fontWeight: "400",
            color: theme.colors.iconGray,
            fontSize: 23,
          }}
        >
          {asset.name}
        </Text>
        <FromToDatePicker
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
        <View
          style={{
            flexDirection: "row",
            width: "70%",
            alignItems: "center",
            gap: 15,
          }}
        >
          <Text
            style={{
              ...theme.customFonts.primary.medium,
              fontWeight: "400",
              color: theme.colors.iconGray,
              fontSize: 23,
            }}
          >
            {"For"}
          </Text>
          <DurationPicker
            duration={duration}
            setDuration={setDuration}
            hours={hours}
            setHours={setHours}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "70%",
            alignItems: "center",
            gap: 15,
          }}
        >
          <Text
            style={{
              ...theme.customFonts.primary.medium,
              fontWeight: "400",
              color: theme.colors.iconGray,
              fontSize: 23,
            }}
          >
            {"Offer"}
          </Text>
          <TextInput
            style={{
              ...theme.customFonts.primary.medium,
              color: theme.colors.white,
              fontSize: 22,
              minWidth: "5%",
            }}
            keyboardType="numeric"
            value={cost.toString()}
            onChangeText={(text) => setCost(Number(text))}
          />
        </View>
        <TextInput
          style={{
            ...theme.customFonts.primary.medium,
            backgroundColor: theme.colors.white,
            borderRadius: 14,
            fontSize: 16,
            height: 150,
            padding: 10,
            textAlignVertical: "top",
          }}
          placeholder="Details..."
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
        <ButtonWithIcon
          text="Send Offer"
          onPress={handleSendOffer}
          icon="check"
        />
      </View>
    </>
  );
};

export default AssetOfferForm;

const styles = StyleSheet.create({});
