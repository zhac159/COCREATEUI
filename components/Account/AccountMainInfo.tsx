import { FC } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { View } from "@/components/Themed";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useTheme } from "../Themes/theme";

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
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.coins,
          backgroundColor: theme.colors.white,
          shadowColor: "#000",
          shadowOffset: {
            width: 3,
            height: 4,
          },
          shadowOpacity: 0.5,
          elevation: 5,
        }}
      >
        <View
          style={{
            position: "absolute",
            // backgroundColor: theme.colors.orange,
            // top: 20,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 25.5,
          }}
        ></View>
        <FontAwesome
          name="bolt"
          style={{ fontSize: 15, color: theme.colors.black, fontWeight: "900" }}
        />
        <Text
          style={{
            ...theme.customFonts.primary.large,
            letterSpacing: 1.7,
            fontSize: 30,
            color: theme.colors.black,
            textAlign: "center",
          }}
        >
          {"500"}
        </Text>
      </View>
      <View style={styles.nameRatingContainer}>
        <Text
          style={{
            ...theme.customFonts.secondary.large,
          }}
        >
          {"AbithaMaha"}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "transparent",
          }}
        >
          <Text style={{ ...theme.customFonts.primary.large, fontSize: 23 }}>
            {"4.8"}
          </Text>
          <FontAwesome name="star" size={20} color="black" />
        </View>
      </View>
    </View>
  );
};

export default AccountMainInfo;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "transparent",
    height: "26.8%",
  },
  coins: {
    borderRadius: 25.5,
    backgroundColor: "orange",
    width: "24%",
    height: "21.7%",
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
  nameRatingContainer: {
    backgroundColor: "transparent",
    alignSelf: "flex-start",
    left: "6.5%",
    top: "15.4%",
  },
});
