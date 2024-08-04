import { FC, RefObject, useRef } from "react";
import { useTheme } from "../Themes/theme";
import {
  Text,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextInput,
} from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import StyledTextField from "./StyledTextField";

type CoinsProps = {
  coins?: number;
  viewStyle?: StyleProp<ViewStyle>;
  showShadow?: boolean;
  setCoins?: (coins: number) => void;
  textInputRef?: RefObject<TextInput>;
};

const Coins: FC<CoinsProps> = ({
  coins,
  viewStyle,
  showShadow = true,
  textInputRef,
  setCoins,
}) => {
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
        {setCoins ? (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <StyledTextField
              editable={true}
              textInputRef={textInputRef}
              value={coins ? coins.toString() : ""}
              textInputProps={{
                keyboardType: "numeric",
                onChangeText: (text) => setCoins(Number(text)),
                style: {
                  ...theme.customFonts.primary.large,
                  ...styles.text,
                  backgroundColor: theme.colors.white,
                  color: theme.colors.black,
                },
              }}
            />
          </View>
        ) : (
          <Text
            style={{
              ...theme.customFonts.primary.large,
              ...styles.text,
              color: theme.colors.black,
            }}
          >
            {coins}
          </Text>
        )}
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
            {coins}
          </Text>
          <BlurView
            intensity={70}
            tint="systemChromeMaterialDark"
            style={{
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
    minWidth: 100,
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
    minWidth: 100,
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    top: 9,
    flexDirection: "row",
    position: "absolute",
    gap: 5,
    overflow: "hidden",
    right: -3,
  },
  text: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    padding: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    margin: 0,
  },
});
