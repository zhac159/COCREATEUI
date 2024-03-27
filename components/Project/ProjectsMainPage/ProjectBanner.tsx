import { FC } from "react";
import { useTheme } from "../../Themes/theme";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { IconButton } from "react-native-paper";
import Media from "../../MediaViewer/Media";

type ProjectBannerProps = {
  name: string | undefined | null;
  onCreate: (createMode: boolean) => void;
  onEdit: (editMode: boolean) => void;
  uri: string | undefined | null;
};

const ProjectBanner: FC<ProjectBannerProps> = ({
  name,
  onCreate,
  onEdit,
  uri,
}) => {
  const theme = useTheme();

  return (
    <View style={styles.imageContainer} key={uri}>
      <Media
        uri={uri}
        style={{ flex: 1 }}
        onPress={() => console.log("jdpo")}
      />
      <View
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          paddingTop: "15%",
          paddingBottom: "5%",
          paddingHorizontal: "5%",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
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
        <View
        >
          <Text
            style={{
              ...theme.customFonts.secondary.medium,
              color: theme.colors.white,
              fontSize: 40,
              paddingBottom: 20,
            }}
          >
            {name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              alignSelf: "flex-end",
              alignContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderRadius: 14,
                paddingVertical: 12,
                paddingHorizontal: 20,
                opacity: 0.8,
                backgroundColor: theme.colors.white,
              }}
            >
              <Text
                style={{
                  ...theme.customFonts.primary.medium,
                  fontSize: 20,
                }}
              >
                Find Asset
              </Text>
            </TouchableOpacity>
            <IconButton
              icon={() => (
                <FontAwesome6
                  name="pen"
                  size={19}
                  color={theme.colors.black}
                  solid
                />
              )}
              onPress={() => onEdit(true)}
              size={30}
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
});
