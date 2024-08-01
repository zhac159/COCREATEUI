import React, { FC, useMemo } from "react";
import { EnquiryDTO } from "@/common/api/model";
import ChatPreview from "@/components/Chats/ChatPreview";
import { View, Text } from "react-native";
import ChatType from "@/common/chat/chatType";
import { useTranslation } from "react-i18next";
import { getChatId } from "@/common/chat/chatHelper";
import { useTheme } from "@/components/Themes/theme";

type ShortlistedEnquiriesChatsProps = {
  enquiries: EnquiryDTO[];
  show: boolean;
};

const ShortlistedEnquiriesChats: FC<ShortlistedEnquiriesChatsProps> = ({
  enquiries,
  show,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const shortlistedEnquiries = useMemo(
    () => enquiries.filter((enquiry) => enquiry.shortlisted),
    [enquiries]
  );

  if (!show) return null;

  return (
    <View>
      {shortlistedEnquiries.length > 0 && (
        <Text
          style={{
            ...theme.customFonts.primary.medium,
            paddingBottom: 18,
            fontWeight: "900",
          }}
        >
          Shortlisted
        </Text>
      )}
      {shortlistedEnquiries.map((enquiry) => {
        if (!enquiry.enquirer) {
          return null;
        }
        return (
          <ChatPreview
            chatName={enquiry.enquirer.username}
            chatType={ChatType.Enquiry}
            chatId={getChatId(ChatType.Enquiry, enquiry.id)}
            chatImage="https://picsum.photos/200/300"
            key={enquiry.id}
            enquiryInformation={enquiry}
            chatMembers={[
              {
                userId: enquiry.enquirer.userId,
                username: enquiry.enquirer.username,
                publicKey: enquiry.enquirer.publicKey!,
              },
            ]}
          />
        );
      })}
    </View>
  );
};

export default ShortlistedEnquiriesChats;
