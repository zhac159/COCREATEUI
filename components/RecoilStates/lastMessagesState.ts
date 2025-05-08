import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
  selectorFamily,
  DefaultValue,
} from "recoil";
import { ChatTypeIdPair } from "../Chats/chatHelper";
import Message from "../Common/Messages/Message";

export type LastMessages = {
  chatId: string;
  lastMessages: Message[];
};

export const lastMessagesState = atom<LastMessages[]>({
  key: "lastMessagesState",
  default: [],
});

export const useLastMessagesState = () => useRecoilState(lastMessagesState);
export const useLastMessagesValue = () => useRecoilValue(lastMessagesState);
export const useSetLastMessagesState = () =>
  useSetRecoilState(lastMessagesState);

export const lastMessagesByChatIdState = selectorFamily<Message[], string>({
  key: "lastMessagesByChatIdState",
  get:
    (chatId) =>
    ({ get }) => {
      const lastMessages = get(lastMessagesState);
      const lastMessage = lastMessages.find(
        (message) => message.chatId === chatId
      );
      return lastMessage ? lastMessage.lastMessages : [];
    },
  set:
    (chatId) =>
    ({ set }, newValue) => {
      set(lastMessagesState, (oldLastMessages) => {
        let found = false;
        const newLastMessagesState = oldLastMessages.map((message) => {
          if (message.chatId === chatId) {
            found = true;
            return newValue instanceof DefaultValue
              ? undefined
              : { ...message, lastMessages: newValue };
          }
          return message;
        });

        if (!found && !(newValue instanceof DefaultValue)) {
          newLastMessagesState.push({ chatId, lastMessages: newValue });
        }

        return newLastMessagesState.filter(Boolean) as LastMessages[];
      });
    },
});

export const useLastMessagesByChatIdState = (
  chatId: string
) => useRecoilState(lastMessagesByChatIdState(chatId));

export const useLastMessagesByChatIdValue = (
  chatId: string
) => useRecoilValue(lastMessagesByChatIdState(chatId));


export const useSetLastMessagesByChatIdState = () => {
  const setLastMessagesState = useSetRecoilState(lastMessagesState);

  return (chatId: string, newValue: Message) => {
    setLastMessagesState((oldLastMessages) => {
      let found = false;
      const newLastMessagesState = oldLastMessages.map((message) => {
        if (message.chatId === chatId) {
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
        newLastMessagesState.push({ chatId, lastMessages: [newValue] });
      }

      return newLastMessagesState.filter(Boolean) as LastMessages[];
    });
  };
};