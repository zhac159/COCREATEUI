import React, { useMemo, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  useAssetOffersValue,
  useAssignedProjectsValue,
  useEnquiriesValue,
} from "@/components/RecoilStates/profileState";
import ChatPreview from "@/components/Chats/ChatPreview";
import ProjectChatPreview from "@/components/Chats/ProjectChatsPreview";
import ChatType from "@/common/chat/chatType";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/components/Themes/theme";
import WorkTabHeaders from "@/components/Work/WorkTabHeaders";
import NoWorkPage from "@/components/Work/NoWorkPage";
import { getChatId } from "@/common/chat/chatHelper";
import { ScrollView } from "react-native-gesture-handler";
import { windowHeight } from "@/components/Account/Common/getWindowDimensions";

export default function Work() {
  const enquiries = useEnquiriesValue();

  const [showWaitingShortlist, setShowWaitingShortlist] = useState(false);

  const assignedProjects = useAssignedProjectsValue();

  const assetOffers = useAssetOffersValue();

  const { t } = useTranslation();

  const theme = useTheme();

  const shortlistedEnquiries = enquiries.filter(
    (enquiry) => enquiry.shortlisted
  );

  const notShortlistedEnquiries = enquiries.filter(
    (enquiry) => !enquiry.shortlisted
  );

  const noWork = useMemo(() => {
    return assignedProjects.length === 0 && shortlistedEnquiries.length === 0;
  }, [assignedProjects, shortlistedEnquiries]);

  const noShortlistedEnquiries = useMemo(() => {
    return shortlistedEnquiries.length === 0;
  }, [shortlistedEnquiries]);

  const noNotShortlistedEnquiries = useMemo(() => {
    return notShortlistedEnquiries.length === 0;
  }, [notShortlistedEnquiries]);

  if (noWork) {
    return <NoWorkPage />;
  }
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text
        style={{
          ...theme.customFonts.primary.medium,
          fontSize: 20,
          fontWeight: "bold",
          color: "black",
          marginBottom: 40,
        }}
      >
        {"Your Work"}
      </Text>
      {assignedProjects.map((project) => (
        <ProjectChatPreview project={project} key={project.id} />
      ))}
      {assignedProjects.length == 0 && (
        <Text
          style={{
            ...theme.customFonts.primary.small,
            fontSize: 17,
            marginVertical: 70,
            color: theme.colors.gray,
          }}
        >
          {t("work.no-team-project")}
        </Text>
      )}
      {!noShortlistedEnquiries && (
        <View
          style={{
            marginBottom: 40,
          }}
        >
          <WorkTabHeaders title={t("work.shortlisted")} />
          {shortlistedEnquiries.map((enquiry) => {
            if (enquiry.projectManager)
              return (
                <ChatPreview
                  chatName={enquiry.projectManager?.username || "N/A"}
                  chatType={ChatType.Enquiry}
                  chatId={getChatId(ChatType.Enquiry, enquiry.id)}
                  key={enquiry.id}
                  enquiryInformation={enquiry}
                  chatMembers={[
                    {
                      userId: enquiry.projectManager.userId,
                      username: enquiry.projectManager.username,
                      publicKey: enquiry.projectManager.publicKey!,
                    },
                  ]}
                />
              );
          })}
        </View>
      )}
      {!noNotShortlistedEnquiries && (
        <View
          style={{
            marginBottom: 200,
          }}
        >
          <WorkTabHeaders
            title={t("work.waiting-shortlist")}
            isExandalbe
            isExpanded={showWaitingShortlist}
            onTitlePress={() => {
              setShowWaitingShortlist(!showWaitingShortlist);
            }}
          />
          {showWaitingShortlist &&
            notShortlistedEnquiries.map((enquiry) => {
              if (enquiry.projectManager)
                return (
                  <ChatPreview
                    chatName={enquiry.projectManager?.username || "N/A"}
                    chatType={ChatType.Enquiry}
                      chatId={getChatId(ChatType.Enquiry, enquiry.id)}
                    key={enquiry.id}
                    enquiryInformation={enquiry}
                    chatMembers={[
                      {
                        userId: enquiry.projectManager.userId,
                        username: enquiry.projectManager.username,
                        publicKey: enquiry.projectManager.publicKey!,
                      },
                    ]}
                  />
                );
            })}
        </View>
      )}
      {/* {assetOffers.map((offer) => (
        <ChatPreview
          chatImage="https://picsum.photos/200/300"
          chatName={offer.project?.projectManager.username || "N/A"}
          chatTargetIdTypePair={{
            chatTargetId: offer.project?.projectManager.userId || 0,
            chatType: ChatType.AssetEnquiry,
          }}
          targetPublicKey={offer.project?.projectManager.publicKey}
          key={offer.id}
        />
      ))} */}
      {/* <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "black",
        }}
      >
        Asset Offers
      </Text> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: "10%",
    paddingHorizontal: "4%",
    gap: 18,
    minHeight: windowHeight,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  message: {
    fontSize: 16,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
