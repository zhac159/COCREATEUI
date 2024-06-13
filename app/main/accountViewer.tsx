import { useGetApiUserGetProfile } from "@/common/api/endpoints/cocreateApi";
import UserProfile from "@/components/Common/UserProfile/UserProfile";
import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function AccountViewer() {

  const params = useLocalSearchParams();
  const userId = parseInt(params.userId as string, 10);

  const {data: userProfile, isLoading} = useGetApiUserGetProfile({userId});

  if (!userProfile || isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <UserProfile userProfile={userProfile} />
  );
}
