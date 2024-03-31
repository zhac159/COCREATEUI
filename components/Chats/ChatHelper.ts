export enum ChatType {
  Enquiry,
  Project,
  AssetEnquiry,
}

export type ChatTypeIdPair = {
  chatId: number;
  chatType: ChatType;
};
