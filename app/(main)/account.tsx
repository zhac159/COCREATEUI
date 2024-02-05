import { StyleSheet, ScrollView, Image } from "react-native";
import { Card, Text } from "react-native-paper";
import { View } from "@/components/Themed";
import { useCurrentUserValue } from "@/components/RecoilStates/profileState";
import PortofolioContent from "@/components/Account/PortofolioContents/PortofolioContents";

export default function Account() {
  const currentUser = useCurrentUserValue();

  if (!currentUser || !currentUser.assets) {
    return null;
  }

  const imageLinks2 = currentUser.assets.map((content) => {
    if (content.uri) {
      return content.uri;
    }
  });

  return (
    <View style={styles.container}>
      <Text
        style={{
          ...styles.title,
          fontSize: 50,
          fontWeight: "bold",
          paddingBottom: 20,
        }}
      >
        {currentUser.coins}
      </Text>
      <Text
        style={{
          ...styles.title,
          fontSize: 50,
          fontWeight: "bold",
          paddingBottom: 20,
        }}
      >
        {currentUser.username}
      </Text>
      <Text
        style={{
          ...styles.title,
          fontSize: 50,
          fontWeight: "bold",
          paddingBottom: 20,
        }}
      >
        {currentUser.aboutYou}
      </Text>
      <Text style={styles.title}>{"assets"}</Text>
      {imageLinks2 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {imageLinks2.map((link, index) => (
            <Card key={index} style={styles.card}>
              <Card.Cover source={{ uri: link }} />
            </Card>
          ))}
        </ScrollView>
      )}
      <PortofolioContent />
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
