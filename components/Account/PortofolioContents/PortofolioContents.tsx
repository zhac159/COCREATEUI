import { useDeleteApiPortofolioContentId } from "@/common/api/endpoints/cocreateApi";
import { usePortfolioContentsValue, usePortfolioContentsState } from "@/components/RecoilStates/profileState";
import { router } from "expo-router";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Card, Text } from "react-native-paper";

const PortofolioContent = () => {
  const [portofolioContents, setPortfolioContents] = usePortfolioContentsState();

  const { mutate } = useDeleteApiPortofolioContentId(
    {
      mutation: {
        onSuccess: (data, variables) => {
          setPortfolioContents((old) => {
            if (old) {
              return old.filter((portofolioContent) => portofolioContent.id !== variables.id);
            }
            return [];
          });
        },
        onError: (error) => {
          console.log(error);
        },
      },
    }
  );

  if (!portofolioContents) {
    return null;
  }

  const imageLinks = portofolioContents.map((content) => {
    if (content.uri) {
      return content.uri;
    }
  });

  return (
    <>
      <Text style={styles.title}>{"portofolio"}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {imageLinks.map((link, index) => (
          <Card key={index} style={styles.card}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() =>
                mutate({
                  id: portofolioContents.find((content) => content.uri === link)?.id!,
                })
              }
            >
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Card.Cover source={{ uri: link }} />
          </Card>
        ))}
        <Card
          style={styles.card}
          onPress={() => router.navigate("/portofolioModal")}
        >
          <Card.Content>
            <Text style={{ fontSize: 30 }}>+</Text>
          </Card.Content>
        </Card>
      </ScrollView>
    </>
  );
};

export default PortofolioContent;

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
  closeButton: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 10,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 18,
    color: "#f00",
  },
});
