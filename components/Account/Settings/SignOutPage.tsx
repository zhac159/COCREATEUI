import React from "react";
import * as SecureStore from "expo-secure-store";
import SecureStoreKeys from "@/common/api/enum/secureStoreKeys";
import { router } from "expo-router";
import { View, StyleSheet } from "react-native";
import StyledButton from "@/components/Common/StyledButton";

export function SignOutPage() {
  const handleSignOut = () => {
    SecureStore.deleteItemAsync(SecureStoreKeys.USER_TOKEN);
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <StyledButton
        onPress={handleSignOut}
        text="Sign Out"
        textColour="white"
        style={{ backgroundColor: "red" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
  },
});
