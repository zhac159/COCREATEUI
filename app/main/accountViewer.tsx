import { useGetApiUserGetProfile } from "@/common/api/endpoints/cocreateApi";
import GoBackButton from "@/components/Common/goBackButton";
import LoadingBackdrop from "@/components/Common/LoadingBackdrop";
import UserProfile from "@/components/Common/UserProfile/UserProfile";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function AccountViewer() {
  const params = useLocalSearchParams();
  const userId = parseInt(params.userId as string, 10);

  const { data: userProfile, isLoading } = useGetApiUserGetProfile({ userId });

  if (!userProfile || isLoading) {
    return <LoadingBackdrop />;
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <GoBackButton/>
      <UserProfile userProfile={userProfile} />
    </View>
  );
}
