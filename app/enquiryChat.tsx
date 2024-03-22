import { StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import {
  Bubble,
  Composer,
  GiftedChat,
  IMessage,
  InputToolbar,
} from "react-native-gifted-chat";
import {
  useEnquiriesByIdState,
  useProjectRoleEnquiriesByIdState,
  useUserIdValue,
} from "@/components/RecoilStates/profileState";
import { usePostApiEnquirySendMessage } from "@/common/api/endpoints/cocreateApi";
import {
  EnquiryDTO,
  EnquiryMessageCreateDTO,
  MediaType,
} from "@/common/api/model";
import Media from "@/components/MediaViewer/Media";
import { router } from "expo-router";
import { useSetMediaViewerState } from "@/components/MediaViewer/mediaViewerState";
import { SetterOrUpdater } from "recoil";
import { useCurrentChatIdValue } from "@/components/RecoilStates/currentChatIdState";

export const getEnquiryChat = (
  id: number
): [EnquiryDTO | undefined, SetterOrUpdater<EnquiryDTO | undefined>] => {
  const [enquiry, setEnquiry] = useProjectRoleEnquiriesByIdState(id);
  const [enquiry2, setEnquiry2] = useEnquiriesByIdState(id);

  if (enquiry) {
    return [enquiry, setEnquiry];
  } else {
    return [enquiry2, setEnquiry2];
  }
};
export default function EnquiryChat() {
  const chatId = useCurrentChatIdValue();

  const [enquiry, setEnquiry] = getEnquiryChat(chatId);

  const setMediaViewer = useSetMediaViewerState();

  const userId = useUserIdValue() || 0;

  const transformedMessages: IMessage[] =
    enquiry?.messages
      ?.map((message, index) => ({
        _id: `${message.id}-${index}`,
        text: message.message || "",
        createdAt: new Date(message.date || ""),
        sent: true,
        user: {
          _id: message.senderId || "unknown",
          name: message.senderId === userId ? "You" : "Other",
        },
        // image: "https://picsum.photos/200/300",
      }))
      .reverse() || [];

  const { mutate: sendMessage } = usePostApiEnquirySendMessage({
    mutation: {
      onSuccess: (data) => {},
      onError: (error) => {
        console.log(error.code);
      },
    },
  });

  const handleSendMessage = (messages: any[]) => {
    const message = messages[0];
    const messageCreateDTO: EnquiryMessageCreateDTO = {
      date: message.createdAt.toISOString(),
      enquiryId: enquiry?.id,
      mediaType: MediaType.NUMBER_0,
      message: message.text,
      uri: null,
    };

    setEnquiry(
      (state) =>
        state && {
          ...state,
          messages: [
            ...(state.messages || []),
            { ...messageCreateDTO, senderId: userId },
          ],
        }
    );
    sendMessage({ data: messageCreateDTO });
  };

  const handleSelectMedia = (uri: string) => {
    setMediaViewer((state) => ({
      visible: false,
      selectedImageIndex: 0,
      uris: [uri],
    }));

    router.push("/portofolioModal");
  };

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={transformedMessages}
        onSend={handleSendMessage}
        renderAvatar={null}
        user={{
          _id: userId,
        }}
        renderBubble={(props) =>
          <Bubble {...props} 
             renderTicks={
              () => <></>
             }
          />
        }
        renderMessageImage={(props) => (
          <Media
            uri={props.currentMessage?.image || ""}
            style={{ width: 150, height: 50 }}
            onPress={() => handleSelectMedia(props.currentMessage?.image || "")}
          />
        )}
        messagesContainerStyle={{ paddingHorizontal: 10 }}
        renderInputToolbar={(props) => (
          <InputToolbar
            {...props}
            containerStyle={{ backgroundColor: "white" }}
            renderComposer={(composerProps) => (
              <Composer
                {...composerProps}
                textInputStyle={{ backgroundColor: "white" }}
              />
            )}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    paddingBottom: 40,
    paddingTop: 60,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
