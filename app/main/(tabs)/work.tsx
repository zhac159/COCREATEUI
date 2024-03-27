import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  useEnquiriesByIdValue,
  useEnquiriesValue,
  useProjectValue,
} from "@/components/RecoilStates/profileState";
import ChatPreview from "@/components/Chats/ChatPreview";
import { ChatType } from "@/components/Chats/ChatHelper";
// import EnquiryChatPreview from "@/components/Chats/EnquiryChatPreview";

export default function Work() {
  const enquiries = useEnquiriesValue();

  return (
    <View style={styles.container}>
      {enquiries &&
        enquiries.map((enquiry) => (
          <ChatPreview
            chatImage="https://picsum.photos/200/300"
            chatName={enquiry.projectManager?.username || "N/A"}
            chatIdTypePair={{
              chatId: enquiry.id || 0,
              chatType: ChatType.Enquiry,
            }}
            key={enquiry.id}
          />
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
