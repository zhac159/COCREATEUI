import { FC } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useTheme } from "../Themes/theme";
import Coins from "../Common/Coins";
import Rating from "../Common/Rating";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
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
            maxWidth: "80%",
          }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {username}
        </Text>
        <Rating rating={rating} />
      </View>
    </View>
  );
};

export default AccountMainInfo;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 55,
    height: Dimensions.get("window").height * 0.27,
    marginBottom: -55,
  },
  nameRatingContainer: {
    backgroundColor: "transparent",
    alignSelf: "flex-start",
    left: "6.5%",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    gap: 2,
  },
});
