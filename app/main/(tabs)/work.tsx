import React from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  useAssetOffersValue,
  useAssignedProjectsValue,
  useEnquiriesValue,
} from "@/components/RecoilStates/profileState";
import ChatPreview from "@/components/Chats/ChatPreview";
import ProjectChatPreview from "@/components/Chats/ProjectChatsPreview";
import ChatType from "@/common/chat/chatType";

export default function Work() {
  const enquiries = useEnquiriesValue();

  const assignedProjects = useAssignedProjectsValue();

  const assetOffers = useAssetOffersValue();

  if (!enquiries) return <Text>Loading...</Text>;

  const shortlistedEnquiries = enquiries.filter(
    (enquiry) => enquiry.shortlisted
  );

  return (
    <View style={styles.container}>
      {assignedProjects &&
        assignedProjects.map((project) => (
          <ProjectChatPreview
            chatTargetIdTypePair={{
              chatTargetId: project.id || 0,
              chatType: ChatType.Project,
            }}
            project={project}
            key={project.id}
          />
        ))}
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
      {assetOffers &&
        assetOffers.map((offer) => (
          <ChatPreview
            chatImage="https://picsum.photos/200/300"
            chatName={offer.project?.projectManager.username || "N/A"}
            chatTargetIdTypePair={{
              chatTargetId: offer.project?.projectManager.userId || 0,
              chatType: ChatType.AssetEnquiry,
            }}
            key={offer.id}
          />
        ))}
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "black",
          margin: 10,
        }}
      >
        Asset Offers
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
    paddingVertical: "10%",
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
