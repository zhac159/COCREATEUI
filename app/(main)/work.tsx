import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  useEnquiriesByIdValue,
  useEnquiriesValue,
  useProjectValue,
} from "@/components/RecoilStates/profileState";
import EnquiryChatPreview from "@/components/Chats/EnquiryChatPreview";

export default function Work() {
  const enquiries = useEnquiriesValue();

  return (
    <View style={styles.container}>
      {enquiries &&
        enquiries.map((enquiry) => (
          <EnquiryChatPreview enquiry={enquiry} enquirer />
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  message: {
    fontSize: 16,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
