import { useCurrentUserValue } from "@/components/RecoilStates/profileState";
import { View } from "react-native";

function UserDetails() {
  const user = useCurrentUserValue();


  const randomPicture = "https://picsum.photos/200/300";

  return <View></View>
}

export default UserDetails;
