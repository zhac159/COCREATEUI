import React, { FC, ReactNode } from "react";
import { View } from "react-native";
import { IconButton } from "react-native-paper";
import { FontAwesome6 } from "@expo/vector-icons";

type AssetFinderWrapperProps = {
  children: ReactNode;
  close?: () => void;
  goBack?: () => void;
};

const AssetFinderWrapper: FC<AssetFinderWrapperProps> = ({ children, close, goBack }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        gap: 20,
        paddingTop: 50,
      }}
    >
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          
          justifyContent: "space-between",
        }}
      >
        {goBack && (
          <IconButton
            icon={() => <FontAwesome6 name="chevron-left" size={18} solid />}
            size={26}
            onPress={goBack}
          />
        )}
        {close && (
          <IconButton
            icon={() => <FontAwesome6 name="xmark" size={18} solid />}
            size={26}
            onPress={close}
            style={{
              alignSelf: "flex-end",
            }}
          />
        )}
      </View>
      {children}
    </View>
  );
};

export default AssetFinderWrapper;
