import { FC } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { View } from "@/components/Themed";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useTheme } from "../Themes/theme";
import { FontAwesome6 } from "@expo/vector-icons";

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
            fontWeight: "900",
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
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 4,
    },
    shadowOpacity: 0.5,
    elevation: 5,
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
