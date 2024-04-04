import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useEnquiriesValue } from "@/components/RecoilStates/profileState";
import ChatPreview from "@/components/Chats/ChatPreview";
import { ChatType } from "@/components/Chats/ChatHelper";

export default function Work() {
  const enquiries = useEnquiriesValue();

  if (!enquiries) return <Text>Loading...</Text>;

  const shortlistedEnquiries = enquiries.filter(
    (enquiry) => enquiry.shortlisted
  );

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "black",
          margin: 10,
        }}
      >
        Shortlisted
      </Text>
      {shortlistedEnquiries &&
        shortlistedEnquiries.map((enquiry) => (
          <ChatPreview
            chatImage="https://picsum.photos/200/300"
            chatName={enquiry.projectManager?.username || "N/A"}
            chatTargetIdTypePair={{
              chatTargetId: enquiry.projectManager?.userId || 0,
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
