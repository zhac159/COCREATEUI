import React, { FC, useMemo } from "react";
import { EnquiryDTO } from "@/common/api/model";
import ChatPreview from "@/components/Chats/ChatPreview";
import { View } from "react-native";
import ChatType from "@/common/chat/chatType";
import { useTranslation } from "react-i18next";
import WorkTabHeaders from "@/components/Work/WorkTabHeaders";

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
  const { t } = useTranslation();

  const shortlistedEnquiries = useMemo(
    () => enquiries.filter((enquiry) => enquiry.shortlisted),
    [enquiries]
  );

  if (!show) return null;

  return (
    <View>
      {shortlistedEnquiries.length > 0 && (
        <WorkTabHeaders title={t("work.shortlisted")} />
      )}
      {shortlistedEnquiries.map((enquiry) => (
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
          targetPublicKey={enquiry.enquirer?.publicKey}
        />
      ))}
    </View>
  );
};

export default ShortlistedEnquiriesChats;
