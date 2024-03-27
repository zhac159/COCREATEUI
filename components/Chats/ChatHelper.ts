export enum ChatType {
  Project,
  Enquiry,
  AssetEnquiry,
}

export type ChatTypeIdPair = {
  chatId: number;
  chatType: ChatType;
};