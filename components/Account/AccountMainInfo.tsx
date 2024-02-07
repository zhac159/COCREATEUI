import { FC } from "react";
import { StyleSheet, ScrollView, Animated, Dimensions } from "react-native";
import { Button, Text } from "react-native-paper";
import { View } from "@/components/Themed";
import { useCurrentUserValue } from "@/components/RecoilStates/profileState";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useEffect, useRef, useState } from "react";
import SkillsTab from "@/components/Account/Skills/SkillsTab";

type AccountMainInfoProps = {
  coins: number;
  username: string;
  rating: number;
};

const AccountMainInfo: FC<AccountMainInfoProps> = ({
  coins,
  username,
  rating,
}) => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
      }}
    >
      <View
        style={{
          borderColor: "black",
          borderRightWidth: 25,
          borderLeftWidth: 25,
          borderTopWidth: 3,
          borderBottomWidth: 3,
          borderRadius: 30,
          backgroundColor: "black",
        }}
      >
        <Text
          style={{
            ...styles.title,
            fontSize: 30,
            fontWeight: "bold",
            color: "white",
          }}
        >
          {coins}
        </Text>
      </View>
      <Text
        style={{
          ...styles.title,
          fontSize: 100,
          fontFamily: "Arial",
          backgroundColor: "transparent",
        }}
      >
        {username}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: -8,
          paddingBottom: 40,
          backgroundColor: "transparent",
        }}
      >
        <Text
          style={{
            fontSize: 30,
            marginRight: 5,
          }}
        >
          {rating}
        </Text>
        <FontAwesome name="star" size={20} color="black" />
      </View>
    </View>
  );
};

export default AccountMainInfo;

const styles = StyleSheet.create({
    title: {
      fontSize: 20,
    },
    card: {
      width: 200,
      margin: 10,
      height: 200,
    },
    scene: {
      flex: 1,
      flexGrow: 1,
      alignItems: "center",
      alignContent: "center",
      
    },
    gradient: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  });
  