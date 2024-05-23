import { MessageDTO } from "@/common/api/model";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
  selectorFamily,
  DefaultValue,
} from "recoil";
import { ChatTypeIdPair } from "../Chats/chatHelper";

export type LastMessages = {
  chatTypeIdPair: ChatTypeIdPair;
  lastMessages: MessageDTO[];
};

export const lastMessagesState = atom<LastMessages[]>({
  key: "lastMessagesState",
  default: [],
});

export const useLastMessagesState = () => useRecoilState(lastMessagesState);
export const useLastMessagesValue = () => useRecoilValue(lastMessagesState);
export const useSetLastMessagesState = () =>
  useSetRecoilState(lastMessagesState);

export const lastMessagesByTargetAndChatTypeState = selectorFamily<
  MessageDTO[],
  ChatTypeIdPair
>({
  key: "lastMessagesByTargetAndChatTypeState",
  get:
    (chatTypeIdPair) =>
    ({ get }) => {
      const lastMessages = get(lastMessagesState);
      const messages = lastMessages.find(
        (message) =>
          message.chatTypeIdPair.chatTargetId === chatTypeIdPair.chatTargetId &&
          message.chatTypeIdPair.chatType === chatTypeIdPair.chatType
      );

      return messages ? messages.lastMessages : [];
    },
  set:
    (chatTypeIdPair) =>
    ({ set, get }, newValue) => {
      const lastMessages = get(lastMessagesState);
      if (lastMessages) {
        let found = false;
        const newLastMessagesState = lastMessages.map((message) => {
          if (
            message.chatTypeIdPair.chatTargetId ===
              chatTypeIdPair.chatTargetId &&
            message.chatTypeIdPair.chatType === chatTypeIdPair.chatType
          ) {
            found = true;
            return newValue instanceof DefaultValue
              ? undefined
              : { ...message, lastMessages: newValue };
          }
          return message;
        });

        if (!found && !(newValue instanceof DefaultValue)) {
          newLastMessagesState.push({ chatTypeIdPair, lastMessages: newValue });
        }

        set(
          lastMessagesState,
          newLastMessagesState.filter(Boolean) as LastMessages[]
        );
      }
    },
});

export const useLastMessagesByTargetAndChatTypeState = (
  chatTypeIdPair: ChatTypeIdPair
) => useRecoilState(lastMessagesByTargetAndChatTypeState(chatTypeIdPair));

export const useLastMessagesByTargetAndChatTypeValue = (
  chatTypeIdPair: ChatTypeIdPair
) => useRecoilValue(lastMessagesByTargetAndChatTypeState(chatTypeIdPair));

export const useSetLastMessagesByTargetAndChatTypeState = () => {
  const setLastMessagesState = useSetRecoilState(lastMessagesState);

  return (chatTypeIdPair: ChatTypeIdPair, newValue: MessageDTO) => {
    setLastMessagesState((oldLastMessages) => {
      let found = false;
      const newLastMessagesState = oldLastMessages.map((message) => {
        if (
          message.chatTypeIdPair.chatTargetId === chatTypeIdPair.chatTargetId &&
          message.chatTypeIdPair.chatType === chatTypeIdPair.chatType
        ) {
          found = true;
          return newValue instanceof DefaultValue
            ? undefined
            : {
                ...message,
                lastMessages: [newValue, ...message.lastMessages].slice(0, 3),
              };
        }
        return message;
      });

      if (!found && !(newValue instanceof DefaultValue)) {
        newLastMessagesState.push({ chatTypeIdPair, lastMessages: [newValue] });
      }

      return newLastMessagesState.filter(Boolean) as LastMessages[];
    });
  };
};
