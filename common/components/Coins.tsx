import { Theme } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { FC } from "react";
import useThemedStyles from "../theme/getThemedStylesheet";
import { FontAwesome6 } from "@expo/vector-icons";
import StyledText from "./StyledComponents/StyledText";

type CoinsProps = {
  value: number;
};

export const Coins: FC<CoinsProps> = ({ value }) => {
  const styles = useThemedStyles(getStyles);

  return (
    <View style={styles.coins}>
      <FontAwesome6 name="bolt" size={15} color={styles.iconColor.color} />
      <StyledText text={value.toString()} />
    </View>
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    coins: {
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      backgroundColor: theme.colors.white,
      gap: 5,
      borderRadius: 25.5,
      minWidth: 80,
      paddingVertical: 5,
    },
    iconColor: {
      color: theme.colors.black,
    },
  });
