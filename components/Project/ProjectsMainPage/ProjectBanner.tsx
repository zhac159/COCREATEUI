import { FC } from "react";
import { useTheme } from "../../Themes/theme";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { IconButton } from "react-native-paper";
import Media from "../../MediaViewer/Media";
import { router, useRouter } from "expo-router";

type ProjectBannerProps = {
  id: number;
  name: string | undefined | null;
  onCreate: (createMode: boolean) => void;
  onEdit: (editMode: boolean) => void;
  uri: string | undefined | null;
};

const ProjectBanner: FC<ProjectBannerProps> = ({
  id,
  name,
  onCreate,
  onEdit,
  uri,
}) => {
  const theme = useTheme();

  const router = useRouter();

  const handleNavigation = () => {
    router.navigate({
      pathname: "/main/completeProject",
      params: {
        projectId: id,
      },
    });
  };

  return (
    <View style={styles.imageContainer} key={uri}>
      <Media uri={uri} style={{ flex: 1 }} />
      <View
        style={{
          ...styles.content,
        }}
      >
        <View
          style={{
            ...styles.header,
          }}
        >
          <Text
            style={{
              ...theme.customFonts.primary.medium,
              color: theme.colors.white,
              fontSize: 25,
            }}
          >
            Your Projects
          </Text>
          <IconButton
            icon={() => (
              <FontAwesome6
                name="plus"
                size={18}
                color={theme.colors.white}
                solid
              />
            )}
            onPress={() => onCreate(true)}
            size={30}
            style={{
              backgroundColor: theme.colors.primary,
              margin: 0,
            }}
          />
        </View>
        <View>
          <TouchableOpacity
            style={{
              ...styles.finishProjectButton,
              backgroundColor: theme.colors.primary,
            }}
            onPress={handleNavigation}
          >
            <Text
              style={{
                ...theme.customFonts.primary.medium,
                color: theme.colors.white,
                fontSize: 18,
              }}
            >
              Finish Project
            </Text>
            <FontAwesome6
              name="check"
              size={18}
              color={theme.colors.white}
              solid
            />
          </TouchableOpacity>
          <Text
            style={{
              ...theme.customFonts.secondary.medium,
              ...styles.name,
              color: theme.colors.white,
            }}
          >
            {name}
          </Text>
          <View
            style={{
              ...styles.footer,
            }}
          >
            <TouchableOpacity
              style={{
                ...styles.findAssetButton,
                backgroundColor: theme.colors.darkerGray,
              }}
            >
              <Text
                style={{
                  ...theme.customFonts.primary.medium,
                  color: theme.colors.white,
                  fontSize: 20,
                }}
              >
                Find Assets
              </Text>
            </TouchableOpacity>
            <IconButton
              icon={() => (
                <FontAwesome6
                  name="pen"
                  size={18}
                  color={theme.colors.black}
                  solid
                />
              )}
              onPress={() => onEdit(true)}
              size={25}
              style={{
                backgroundColor: theme.colors.white,
                margin: 0,
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProjectBanner;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    flex: 1,
    padding: 0,
  },
  imageContainer: {
    height: 400,
    width: "100%",
  },
  name: {
    fontSize: 40,
    paddingBottom: 20,
    fontWeight: "400",
  },
  content: {
    position: "absolute",
    width: "100%",
    height: "100%",
    paddingTop: "15%",
    paddingBottom: "5%",
    paddingHorizontal: "5%",
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    alignSelf: "flex-end",
    alignContent: "center",
  },
  findAssetButton: {
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  finishProjectButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    maxWidth: 170,
    marginBottom: 10,
  },
});
