import { FC } from "react";
import { useTheme } from "../Themes/theme";
import { Text, View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

type CoinsProps = {
  coins: number;
  viewStyle?: StyleProp<ViewStyle>;
  showShadow?: boolean;
};

const Coins: FC<CoinsProps> = ({ coins, viewStyle, showShadow = true }) => {
  const theme = useTheme();
  return (
    <View style={viewStyle}>
      <View
        style={{
          ...styles.coins,
          backgroundColor: theme.colors.white,
          borderColor: theme.colors.black,
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
            ...styles.text,
            color: theme.colors.black,
          }}
        >
          {"500"}
        </Text>
      </View>
      {showShadow && (
        <View
          style={{
            ...styles.coinShadow,
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
              ...styles.text,
              paddingHorizontal: 15,
              paddingVertical: 7,
              color: theme.colors.black,
            }}
          >
            {"500"}
          </Text>
          <BlurView
            intensity={100}
            style={{
              backgroundColor: theme.colors.black,
              marginRight: 10,
              position: "absolute",
              height: "100%",
              width: "100%",
            }}
          />
        </View>
      )}
    </View>
  );
};

export default Coins;

const styles = StyleSheet.create({
  coins: {
    borderRadius: 25.5,
    paddingVertical: 4,
    paddingLeft: 10,
    paddingRight: 12,
    alignItems: "center",
    alignSelf: "flex-end",
    justifyContent: "center",
    flexDirection: "row",
    gap: 5,
    borderWidth: 3,
  },
  coinShadow: {
    zIndex: -1,
    borderRadius: 25.5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    flexDirection: "row",
    position: "absolute",
    gap: 5,
    overflow: "hidden",
    right: -4,
  },
  text: {
    fontWeight: "bold",
    letterSpacing: 1.7,
    fontSize: 30,
    textAlign: "center",
  },
});
