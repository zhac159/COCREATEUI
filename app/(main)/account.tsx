import { StyleSheet, ScrollView, Image } from "react-native";
import { Card } from "react-native-paper";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { useCurrentUserValue } from "@/components/RecoilStates/profileState";
import { useMutation } from "react-query";

export default function TabTwoScreen() {
  const currentUser = useCurrentUserValue();



  if (!currentUser || !currentUser.portofolioContents) {
    return null;
  }
  // const imageLinks = currentUser.portofolioContents.map((content) => {
  //   if (content.uri) {
  //     return content.uri;
  //   }
  // });


  return (
    <View style={styles.container}>
      <Text style={styles.title}>{currentUser!.username}</Text>
{/* {   imageLinks &&   <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {imageLinks.map((link, index) => (
          <Card key={index} style={styles.card}>
            <Card.Cover source={{ uri: link }} />
          </Card>
        ))}
      </ScrollView>} */}
      <View lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  card: {
    width: 200,
    margin: 10,
    height: 200,
  },
});
