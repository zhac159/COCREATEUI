import React from "react";
import { StyleSheet, View } from "react-native";
import ChangePasswordForm from "./ChangePasswordForm";
import { UpdateLocationForm } from "./UpdateLocationForm";
import { ChangeEmailForm } from "./ChangeEmailForm";

export function AccountDetailsAndLocation() {
  return (
    <View style={styles.container}>
      <UpdateLocationForm />
      <ChangePasswordForm />
      <ChangeEmailForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 50,
  },
});
