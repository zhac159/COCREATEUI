import { ChatDTO } from "@/api/model";

export type ChatPreviewInfo = ChatDTO & {
    lastMessage: string;
    lastMessageDate: string;
}