import { StyleSheet, ScrollView, Animated, Dimensions } from "react-native";
import { Button, Text } from "react-native-paper";
import { View } from "@/components/Themed";
import { useCurrentUserValue } from "@/components/RecoilStates/profileState";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useEffect, useRef, useState } from "react";
import SkillsTab from "@/components/Account/Skills/SkillsTab";

const SecondRoute = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 30000,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 30000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const colorInterpolation = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [
      "rgba(0, 128, 0, 1)",
      "rgba(0, 0, 255, 1)",
      "rgba(173, 216, 230, 1)",
    ],
  });

  return (
    <View style={[styles.scene, { backgroundColor: "red" }]}>
      <Animated.View
        style={{ ...styles.gradient, backgroundColor: colorInterpolation }}
      />
    </View>
  );
};

const FirstRoute = () => (
  <View style={[styles.scene]}>
    <SkillsTab />
  </View>
);

const ThirdRoute = () => (
  <View style={[styles.scene, { backgroundColor: "green" }]} />
);

const FourthRoute = () => (
  <View style={[styles.scene, { backgroundColor: "blue" }]} />
);

const FifthRoute = () => (
  <View style={[styles.scene, { backgroundColor: "yellow" }]} />
);

const initialLayout = { width: Dimensions.get("window").width };

export default function Account() {
  const currentUser = useCurrentUserValue();

  if (!currentUser || !currentUser.assets) {
    return null;
  }

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "First" },
    { key: "second", title: "Second" },
    { key: "third", title: "Third" },
    { key: "fourth", title: "Fourth" },
    { key: "fifth", title: "Fifth" },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    fourth: FourthRoute,
    fifth: FifthRoute,
  });

  return (
    <>
      <View style={{ flex: 1, backgroundColor: "transparent" }}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
          }}
        >
          <View
            style={{
              borderColor: "black",
              borderRightWidth: 25,
              borderLeftWidth: 25,
              borderTopWidth: 3,
              borderBottomWidth: 3,
              borderRadius: 30,
              backgroundColor: "black",
            }}
          >
            <Text
              style={{
                ...styles.title,
                fontSize: 30,
                fontWeight: "bold",
                color: "white",
              }}
            >
              {currentUser.coins}
            </Text>
          </View>
          <Text
            style={{
              ...styles.title,
              fontSize: 100,
              fontFamily: "Arial",
              backgroundColor: "transparent",
            }}
          >
            {currentUser.username}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: -8,
              paddingBottom: 40,
              backgroundColor: "transparent",
            }}
          >
            <Text
              style={{
                fontSize: 30,
                marginRight: 5,
              }}
            >
              {currentUser.rating}
            </Text>
            <FontAwesome name="star" size={20} color="black" />
          </View>
        </View>
        <View
          style={{
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: "black",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
            paddingBottom: 15,
            paddingTop: 15,
            width: "100%",
            backgroundColor: "transparent",

          }}
        >
          <Button
            onPress={() => {
              setIndex(0);
            }}
            style={{
              backgroundColor: index == 0 ? "blue" : "transparent",
            }}
          >
            <Text
              style={{
                color: index == 0 ? "white" : "black",
                fontWeight: "bold",
              }}
            >
              {"Skills"}
            </Text>
          </Button>
          <Button
            onPress={() => {
              setIndex(1);
            }}
            style={{ backgroundColor: index == 1 ? "blue" : "transparent" }}
          >
            <Text
              style={{
                color: index == 1 ? "white" : "black",
                fontWeight: "bold",
              }}
            >
              {"Assets"}
            </Text>
          </Button>
          <Button
            onPress={() => {
              setIndex(2);
            }}
            style={{ backgroundColor: index == 2 ? "blue" : "transparent" }}
          >
            <Text
              style={{
                color: index == 2 ? "white" : "black",
                fontWeight: "bold",
              }}
            >
              {"Portofolio"}
            </Text>
          </Button>
          <Button
            onPress={() => {
              setIndex(3);
            }}
            style={{ backgroundColor: index == 3 ? "blue" : "transparent" }}
          >
            <Text
              style={{
                color: index == 3 ? "white" : "black",
                fontWeight: "bold",
              }}
            >
              {"About"}
            </Text>
          </Button>
          <Button
            onPress={() => {
              setIndex(4);
            }}
            style={{ backgroundColor: index == 4 ? "blue" : "transparent" }}
          >
            <Text
              style={{
                color: index == 4 ? "white" : "black",
                fontWeight: "bold",
              }}
            >
              {"Feedback"}
            </Text>
          </Button>
        </View>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
          renderTabBar={() => null}
          style={{ backgroundColor: "transparent" }}
        />
      </View>
      {/* <AccountComponent /> */}
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },
  card: {
    width: 200,
    margin: 10,
    height: 200,
  },
  scene: {
    flex: 1,
    flexGrow: 1,
    alignItems: "center",
    alignContent: "center",
    
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});

// const imageLinks2 = currentUser.assets.map((content) => {
//   if (content.uri) {
//     return content.uri;
//   }
// });
{
  /* <Text
        style={{
          ...styles.title,
          fontSize: 50,
          fontWeight: "bold",
          paddingBottom: 20,
        }}
      >
        {currentUser.aboutYou}
      </Text> */
}
{
  /* <Text style={styles.title}>{"assets"}</Text>
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
      <View lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */
}
