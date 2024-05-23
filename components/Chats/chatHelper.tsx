export enum ChatType {
  Enquiry,
  Project,
  AssetEnquiry,
}

export type ChatTypeIdPair = {
  chatTargetId: number;
  chatType: ChatType;
};

export type ChatHeaderIconButton = {
  iconName: string;
  iconColor: string;
  iconBackgroundColor: string;
  onPress: () => void;
};
