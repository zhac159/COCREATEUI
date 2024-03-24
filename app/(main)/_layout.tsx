import React, { createContext, useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import * as SecureStore from "expo-secure-store";
import {
  enquiriesByIdSelector,
  projectRoleEnquiriesByIdSelector,
  useGetIntUserIdValue,
  useSetProjectRoleEnquiriesByIdState,
} from "@/components/RecoilStates/profileState";
import { useRecoilCallback } from "recoil";
import { EnquiryMessageDTO, MessageDTO } from "@/common/api/model";
import { Alert } from "react-native";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={15} {...props} />;
}

export const ConnectionContext = createContext<HubConnection | null>(null);

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const userId = useGetIntUserIdValue();

  // const updateEnquiry = useRecoilCallback(
  //   ({ set }) =>
  //     (enquiryId: number, message: EnquiryMessageDTO) => {
  //       var foundFlag = false;

  //       set(enquiriesByIdSelector(enquiryId), (currentEnquiry) => {
  //         if (currentEnquiry) {
  //           foundFlag = true;
  //           return {
  //             ...currentEnquiry,
  //             messages: [
  //               ...(currentEnquiry.messages || []),
  //               { ...message, senderId: message.senderId },
  //             ],
  //           };
  //         }
  //         return currentEnquiry;
  //       });

  //       if (!foundFlag) {
  //         set(projectRoleEnquiriesByIdSelector(enquiryId), (currentEnquiry) => {
  //           if (currentEnquiry) {
  //             return {
  //               ...currentEnquiry,
  //               messages: [
  //                 ...(currentEnquiry.messages || []),
  //                 { ...message, senderId: message.senderId },
  //               ],
  //             };
  //           }
  //           return currentEnquiry;
  //         });
  //       }
  //     }
  // );

  // useEffect(() => {
  //   const fetchTokenAndStartConnection = async () => {
  //     const token = await SecureStore.getItemAsync("userToken");
  //     if (!token) {
  //       throw new Error("Token not found");
  //     }
  //     const connection = new HubConnectionBuilder()
  //       .withUrl("http://192.168.1.92:5000/chatHub", {
  //         accessTokenFactory: () => token,
  //       })
  //       .withAutomaticReconnect()
  //       .build();

  //     connection
  //       .start()
  //       .then(() => console.log("Connection started"))
  //       .catch((err) => console.log("Error while starting connection: " + err));

  //     connection.on("ReceiveEnquiryMessage", (message: MessageDTO) => {
  //       Alert.alert("New message", JSON.stringify(message.content) || "");
  //     });

  //     setConnection(connection);
  //   };

  //   fetchTokenAndStartConnection();

  //   return () => {
  //     connection?.stop().then(() => console.log("Connection stopped"));
  //   };
  // }, []);

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          tabBarStyle: {
            backgroundColor: "transparent",
            padding: 0,
            margin: 0,
          },
          headerStyle: {
            height: 0,
            backgroundColor: "transparent",
            shadowOpacity: 0,
          },
        }}
        sceneContainerStyle={{ backgroundColor: "transparent" }}
      >
        <Tabs.Screen
          name="account"
          options={{
            headerTitle: "",
            tabBarIcon: ({ color }) => <TabBarIcon name="eye" color={color} />,
          }}
        />
        <Tabs.Screen
          name="work"
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          }}
        />
        <Tabs.Screen
          name="discovery"
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          }}
        />
        <Tabs.Screen
          name="project"
          options={{
            title: "Project",
            headerTitle: "",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="music" color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
