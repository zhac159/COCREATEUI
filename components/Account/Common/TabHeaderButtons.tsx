import { useTheme } from "@/components/Themes/theme";
import { FontAwesome6 } from "@expo/vector-icons";
import { FC } from "react";
import { View, StyleSheet } from "react-native";
import { Button, IconButton, Text } from "react-native-paper";

type TabHeaderButtonsProps = {
  editMode?: boolean;
  disableEditMode?: boolean;
  setEditMode: (editMode: boolean) => void;
  createMode?: boolean;
  setCreateMode?: (createMode: boolean) => void;
  onDone: () => void;
  showPlayButton?: boolean;
};

const TabHeaderButtons: FC<TabHeaderButtonsProps> = ({
  editMode = false,
  disableEditMode = false,
  setEditMode = () => null,
  createMode = false,
  setCreateMode = undefined,
  onDone,
  showPlayButton = false,
}) => {
  const theme = useTheme();

  return (
    <View style={styles.buttonsContainer}>
      {!editMode && !createMode ? (
        <>
          <IconButton
            icon={() => (
              <FontAwesome6 name="pen" size={18} color="white" solid />
            )}
            disabled={disableEditMode}
            size={26}
            onPress={() => {
              setEditMode(!editMode);
            }}
            style={{
              backgroundColor: disableEditMode? theme.colors.gray: theme.colors.primary,
              margin: 0,
              padding: 0,
            }}
          />
          {setCreateMode && (
            <IconButton
              icon={() => (
                <FontAwesome6 name="plus" size={18} color="white" solid />
              )}
              size={26}
              onPress={() => {
                setCreateMode(!createMode);
              }}
              style={{
                backgroundColor: theme.colors.primary,
                margin: 0,
                padding: 0,
              }}
            />
          )}
          {showPlayButton && (
            <IconButton
              icon={() => (
                <FontAwesome6 name="play" size={18} color="white" solid />
              )}
              size={26}
              onPress={() => {
                console.log("Pressed");
              }}
              style={{
                backgroundColor: theme.colors.black,
                margin: 0,
                padding: 0,
              }}
            />
          )}
        </>
      ) : (
        <>
          <Button
            style={{
              backgroundColor: theme.colors.primary,
              paddingHorizontal: "2%",
              paddingVertical: "2.5%",
              borderRadius: 100,
            }}
            onPress={() => {
              setEditMode(false);
              if (setCreateMode) setCreateMode(false);
              onDone();
            }}
          >
            <Text
              style={{
                ...theme.customFonts.primary.medium,
                color: theme.colors.white,
              }}
            >
              {"Done"}
            </Text>
          </Button>
        </>
      )}
    </View>
  );
};

export default TabHeaderButtons;

const styles = StyleSheet.create({
  buttonsContainer: {
    alignSelf: "flex-end",
    flexDirection: "row",
    paddingTop: "2%",
    paddingRight: "2%",
    paddingBottom: "5%",
    gap: 16,
  },
});
