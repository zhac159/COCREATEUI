import { FC } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useTheme } from "../Themes/theme";
import { FontAwesome6 } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import Coins from "../Common/Coins";
import Rating from "../Common/Rating";

type AccountMainInfoProps = {
  coins: number;
  username: string;
  rating: number;
  blur: number;
};

const AccountMainInfo: FC<AccountMainInfoProps> = ({
  coins,
  username,
  rating,
  blur,
}) => {
  const theme = useTheme();

  return (
    <BlurView style={styles.container} intensity={blur}>
      <Coins
        coins={coins}
        viewStyle={{
          alignSelf: "flex-end",
          marginRight: 10,
        }}
      />
      <View style={styles.nameRatingContainer}>
        <Text
          style={{
            ...theme.customFonts.secondary.large,
          }}
        >
          {"AbithaMaha"}
        </Text>
       <Rating
          rating={rating}
        />
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
    height: Dimensions.get("window").height * 0.21,
    marginBottom: -55,
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
