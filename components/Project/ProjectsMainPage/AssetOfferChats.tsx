import { AssetOfferDTO } from "@/common/api/model";
import ChatType from "@/common/chat/chatType";
import ChatPreview from "@/components/Chats/ChatPreview";
import { useTheme } from "@/components/Themes/theme";
import React, { FC } from "react";
import { View, Text } from "react-native";

type AssetOfferChatsProps = {
  assetOffers: AssetOfferDTO[];
  show: boolean;
};

const AssetOfferChats: FC<AssetOfferChatsProps> = ({ assetOffers, show }) => {
  const theme = useTheme();

  if (!show) return null;

  return (
    <View>
      <Text
        style={{
          ...theme.customFonts.primary.medium,
          paddingBottom: 18,
          paddingLeft: 10,
        }}
      >
        Offers
      </Text>
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: theme.colors.gray,
        }}
      >
        {assetOffers.map((offer) => (
          <ChatPreview
            chatName={offer.asset?.owner?.username || "N/A"}
            chatTargetIdTypePair={{
              chatTargetId: offer.asset?.owner?.userId || 0,
              chatType: ChatType.AssetEnquiry,
            }}
            chatImage="https://picsum.photos/200/300"
            key={offer.id}
            targetPublicKey={offer.asset?.owner?.publicKey}
            assetOfferInformation={offer}
          />
        ))}
      </View>
    </View>
  );
};

export default AssetOfferChats;
