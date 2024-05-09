import React, { FC } from "react";
import { EnquiryDTO } from "@/common/api/model";
import ChatPreview from "@/components/Chats/ChatPreview";
import { ChatType } from "@/components/Chats/ChatHelper";
import { View } from "react-native";
import { useTheme } from "@/components/Themes/theme";

type ShortlistedEnquiriesChatsProps = {
  enquiries: EnquiryDTO[];
};

const ShortlistedEnquiriesChats: FC<ShortlistedEnquiriesChatsProps> = ({
  enquiries,
}) => {
  const theme = useTheme();

//   const { mutate: confirmEnquiry } = usePostApiEnquiryConfirm({
//     mutation: {
//       onSuccess: async (data) => {
//         console.log("Enquiry confirmed");
//       },
//     },
//   });

//   const handleConfirmEnquiry = async (
//     enquiryId: number,
//     receiverPublicKey: string,
//     receiverId: number,
//     projectId: number
//   ) => {
//     confirmEnquiry({
//       data: {
//         enquiryId: enquiryId,
//       },
//     });
//     await exchangeProjectKey(
//       receiverPublicKey,
//       receiverId,
//       projectId,
//       connection
//     );
//   };

  return (
    <View
      style={{
        borderTopWidth: 1,
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
            chatImage="https://picsum.photos/200/300"
            key={enquiry.id}
          />
        ))}
    </View>
  );
};

export default ShortlistedEnquiriesChats;

{
  /* <Button
                  onPress={() => {
                    handleConfirmEnquiry(
                      enquiry.id!,
                      enquiry.enquirer?.publicKey || "",
                      enquiry.enquirer?.userId || 0,
                      projects ? projects[selectedProject]?.id! : 2
                    );
                  }}
                >
                  <Text>Confirm</Text>
                </Button> */
}
