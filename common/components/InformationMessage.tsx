import { FontAwesome6 } from "@expo/vector-icons";
import { Theme } from "@react-navigation/native";
import { FC, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import useThemedStyles from "../theme/getThemedStylesheet";
import StyledText from "./StyledComponents/StyledText";



type InformationMessage = {
  type: "info" | "warning" | "error";
  message: string;
};

export const InformationMessage: FC<InformationMessage> = ({
  type,
  message,
}) => {
  const styles = useThemedStyles(getStyles);

  const iconName = useMemo(() => {
    switch (type) {
      case "info":
        return "circle-info";
      case "warning":
        return "circle-exclamation";
      case "error":
        return "circle-exclamation";
    }
  }, [type]);

  return (
    <View style={styles.container}>
      <FontAwesome6 name={iconName} size={14} color={styles[type].color} />
      <StyledText text={message} style={styles[type]} />
    </View>
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
    },
    info: {
      color: theme.colors.gray,
    },
    warning: {
      color: theme.colors.orange,
    },
    error: {
      color: theme.colors.red,
    },
  });
