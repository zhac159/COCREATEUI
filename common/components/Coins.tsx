import { Theme } from "@react-navigation/native";
import { StyleSheet, View, ViewProps } from "react-native";
import { FC } from "react";
import useThemedStyles from "../theme/getThemedStylesheet";
import { FontAwesome6 } from "@expo/vector-icons";
import StyledText from "./StyledComponents/StyledText";

type CoinsProps = ViewProps & {
  value: number;
};

export const Coins: FC<CoinsProps> = ({ value, style, ...props }) => {
  const styles = useThemedStyles(getStyles);

  return (
    <View style={[styles.coins, style]}>
      <FontAwesome6 name="bolt" size={15} color={styles.iconColor.color} />
      <StyledText text={value.toString()} style={styles.textStyle} />
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
      minWidth: 100,
      paddingHorizontal: 15,
      paddingVertical: 5,
      elevation: 5,
    },
    iconColor: {
      color: theme.colors.black,
    },
    textStyle: {
      fontSize: 30,
    },
  });
