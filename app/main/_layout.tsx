import { Stack, router, useRouter } from "expo-router";
import React, { createContext, useEffect, useState } from "react";
import { HubConnection } from "@microsoft/signalr";
import { EncryptedKeyExchangeDTO, MessageDTO } from "@/common/api/model";
import { fetchTokenAndStartConnection } from "@/common/webSockets/webSocketsHelper";
import {
  handleReceiveNewEnquiry,
  handleUpdateEnquiryShortlistStatus,
  handleReceiveEncryptedKeysExchange,
  handleReceivedMessages,
  handleUpdateCompleteProject,
} from "@/common/chat/chatHelper";
import { useSQLiteContext } from "expo-sqlite/next";
import { useSetLastMessagesByTargetAndChatTypeState } from "@/components/RecoilStates/lastMessagesState";
import {
  useUpdateProjectComplete,
  useUpdateEnquiryShortlisted,
  useUpdateProjectRoleEnquiries,
  useAssignedProjectsValue,
} from "@/components/RecoilStates/profileState";
import { JsStack } from "@/components/Common/JStack";
import { TransitionPresets } from "@react-navigation/stack";

export const ConnectionContext = createContext<HubConnection | null>(null);

export default function HelperScreenNav() {
  const [connection, setConnection] = useState<HubConnection | null>(null);

  const router = useRouter();

  const assignedProjects = useAssignedProjectsValue();

  const setLastMessages = useSetLastMessagesByTargetAndChatTypeState();

  const updateProjectRoleEnquiries = useUpdateProjectRoleEnquiries();

  const updateShortlistEnquiry = useUpdateEnquiryShortlisted();

  const updateProjectComplete = useUpdateProjectComplete();

  const database = useSQLiteContext();

  useEffect(() => {
    fetchTokenAndStartConnection().then((connection) => {
      setConnection(connection);
    });
    return () => {
      connection?.stop().then(() => console.log("Connection stopped"));
    };
  }, []);

  useEffect(() => {
    if (!connection || !database) return;

    connection.on("ReceiveMessages", (messages: MessageDTO[]) => {
      handleReceivedMessages(connection, database, messages, setLastMessages);
    });
  }, [connection, database]);

  useEffect(() => {
    if (!connection) return;

    connection.on(
      "ReceiveEncryptedKeysExchange",
      (encryptedKeys: EncryptedKeyExchangeDTO[]) => {
        handleReceiveEncryptedKeysExchange(connection, encryptedKeys);
      }
    );
  }, [connection]);

  useEffect(() => {
    if (!connection) return;

    const cleanup = handleReceiveNewEnquiry(
      connection,
      updateProjectRoleEnquiries
    );

    return cleanup;
  }, [connection]);

  useEffect(() => {
    if (!connection) return;

    const cleanup = handleUpdateEnquiryShortlistStatus(
      connection,
      updateShortlistEnquiry
    );

    return cleanup;
  }, [connection]);

  useEffect(() => {
    if (!connection) return;

    const cleanup = handleUpdateCompleteProject(
      connection,
      updateProjectComplete
    );

    return cleanup;
  }, [connection]);

  useEffect(() => {
    if (assignedProjects) {
      var completedProject = assignedProjects.find(
        (project) => project.completed
      );

      if (completedProject) {
        router.navigate({
          pathname: "/main/completeProjectRole",
          params: {
            projectId: completedProject.id,
          },
        });
      }
    }
  }, [assignedProjects]);

  return (
    <ConnectionContext.Provider value={connection}>
      <JsStack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        <JsStack.Screen
          name="completeProject"
          options={{
            ...TransitionPresets.ModalPresentationIOS,
            presentation: "modal",
            gestureEnabled: true,
          }}
        />
        <JsStack.Screen
          name="assetFinder"
          options={{
            gestureEnabled: true,
          }}
        />
        <JsStack.Screen
          name="completeProjectRole"
          options={{
            ...TransitionPresets.ModalPresentationIOS,
            presentation: "modal",
            gestureEnabled: true,
          }}
        />
        <JsStack.Screen
          name="portofolioModal"
          options={{
            ...TransitionPresets.ModalPresentationIOS,
            presentation: "modal",
            gestureEnabled: true,
          }}
        />
        <JsStack.Screen
          name="assetOffer"
          options={{
            ...TransitionPresets.ModalPresentationIOS,
            presentation: "modal",
            gestureEnabled: true,
          }}
        />
        <Stack.Screen name="chat" />
        <Stack.Screen name="locationForm" />
      </JsStack>
    </ConnectionContext.Provider>
  );
}
