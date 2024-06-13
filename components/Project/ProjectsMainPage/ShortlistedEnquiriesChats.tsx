import React, { FC } from "react";
import { EnquiryDTO } from "@/common/api/model";
import ChatPreview from "@/components/Chats/ChatPreview";
import { View } from "react-native";
import { useTheme } from "@/components/Themes/theme";
import ChatType from "@/common/chat/chatType";

type ShortlistedEnquiriesChatsProps = {
  enquiries: EnquiryDTO[];
  show: boolean;
  projectId: number;
};

const ShortlistedEnquiriesChats: FC<ShortlistedEnquiriesChatsProps> = ({
  enquiries,
  show,
  projectId,
}) => {
  const theme = useTheme();

  if (!show) return null;

  return (
    <View
      style={{
        borderTopColor: theme.colors.gray,
      }}
    >
      {enquiries
        .filter((enquiry) => enquiry.shortlisted)
        .map((enquiry) => (
          <ChatPreview
            chatName={enquiry.enquirer?.username || "N/A"}
            chatTargetIdTypePair={{
              chatTargetId: enquiry.enquirer?.userId || 0,
              chatType: ChatType.Enquiry,
            }}
            projectId={projectId}
            chatImage="https://picsum.photos/200/300"
            key={enquiry.id}
            enquiryInformation={enquiry}
          />
        ))}
    </View>
  );
};

export default ShortlistedEnquiriesChats;
