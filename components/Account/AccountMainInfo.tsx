import { FC } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { View } from "@/components/Themed";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useTheme } from "../Themes/theme";
import { FontAwesome6 } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { windowHeight } from "./Common/getWindowDimensions";

type AccountMainInfoProps = {
  coins: number;
  username: string;
  rating: number;
  isSticky: boolean;
};

const AccountMainInfo: FC<AccountMainInfoProps> = ({
  coins,
  username,
  rating,
  isSticky,
}) => {
  const theme = useTheme();

  return (
    <BlurView style={styles.container} intensity={isSticky ? 100 : 0}>
      <View
        style={{
          ...styles.coins,
          backgroundColor: theme.colors.white,
        }}
      >
        <FontAwesome6
          name="bolt"
          size={15}
          color={theme.colors.black}
          regular={true}
        />
        <Text
          style={{
            ...theme.customFonts.primary.large,
            fontWeight: "bold",
            letterSpacing: 1.7,
            fontSize: 30,
            color: theme.colors.black,
            textAlign: "center",
          }}
        >
          {"500"}
        </Text>
      </View>
      <View
        style={{
          ...styles.shadowCoins,
          position: "absolute",
          zIndex: -1,
          top: "5.5%",
          right: "2.2%",
          overflow: "hidden",
          backgroundColor: "transparent",
        }}
      >
        <BlurView
          intensity={100}
          style={{
            backgroundColor: theme.colors.black,
            position: "absolute",
            width: "100%",
            height: "100%",
            opacity: 0.7,
            padding: 0,
            margin: 0,
          }}
        />
      </View>
      <View style={styles.nameRatingContainer}>
        <Text
          style={{
            ...theme.customFonts.secondary.large,
          }}
        >
          {"AbithaMaha"}
        </Text>
        <View style={styles.ratingContainer}>
          <Text style={{ ...theme.customFonts.primary.large, fontSize: 23 }}>
            {"4.8"}
          </Text>
          <FontAwesome6
            name="star"
            size={13}
            color={theme.colors.black}
            solid
          />
        </View>
      </View>
    </BlurView>
  );
};

export default AccountMainInfo;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "transparent",
    marginTop: 55,
    height: windowHeight * 0.22,
    marginBottom: -55,
  },
  coins: {
    borderRadius: 25.5,
    width: "24%",
    height: "23.7%",
    alignItems: "center",
    alignSelf: "flex-end",
    justifyContent: "center",
    flexDirection: "row",
    right: "5.8%",
    gap: 5,
    top: "2%",
    borderWidth: 3,
    borderColor: "black",
    overflow: "visible",
  },
  shadowCoins: {
    borderRadius: 25.5,
    width: "24%",
    height: "23.7%",
    alignItems: "center",
    alignSelf: "flex-end",
    justifyContent: "center",
    flexDirection: "row",
    right: "5.8%",
    gap: 5,
    top: "2%",
    overflow: "visible",
  },
  nameRatingContainer: {
    backgroundColor: "transparent",
    alignSelf: "flex-start",
    left: "6.5%",
    top: "15.4%",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    gap: 2,
  },
});
