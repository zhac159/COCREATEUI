import { AssetOfferDTO } from "@/common/api/model";
import { ChatType } from "@/components/Chats/ChatHelper";
import ChatPreview from "@/components/Chats/ChatPreview";
import React, { FC } from "react";

type AssetOfferChatsProps = {
  assetOffers: AssetOfferDTO[];
};

const AssetOfferChats: FC<AssetOfferChatsProps> = ({ assetOffers }) => {
  return (
    <>
      {assetOffers.map((offer) => (
        <ChatPreview
          chatName={offer.asset?.owner?.username || "N/A"}
          chatTargetIdTypePair={{
            chatTargetId: offer.asset?.owner?.userId || 0,
            chatType: ChatType.AssetEnquiry,
          }}
          chatImage="https://picsum.photos/200/300"
          key={offer.id}
        />
      ))}
    </>
  );
};

export default AssetOfferChats;
