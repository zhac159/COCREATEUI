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
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        <Stack.Screen
          name="portofolioModal"
          options={{ presentation: "modal" }}
        />
        <Stack.Screen
          name="completeProject"
          options={{ presentation: "modal" }}
        />
        <Stack.Screen
          name="completeProjectRole"
          options={{ presentation: "modal" }}
        />
        <Stack.Screen name="chat" />
        <Stack.Screen name="locationForm" />
      </Stack>
    </ConnectionContext.Provider>
  );
}
