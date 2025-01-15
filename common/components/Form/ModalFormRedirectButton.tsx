import { FC } from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { Theme } from "@react-navigation/native";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import { FontAwesome6 } from "@expo/vector-icons";
import StyledText from "../StyledComponents/StyledText";
import { router, Href } from "expo-router";
import { StackPositions } from "@/common/constants/stackPostitions";
import { StyledTouchableOpacity } from "../StyledComponents/StyledTouchableOpacity";

type ModalFormRedirectButtonProps = ViewProps & {
  icon: string;
  text: string;
  value: string;
  error?: boolean;
  modalRoute: Href;
  stackPosition?: StackPositions;
};

export const ModalFormRedirectButton: FC<ModalFormRedirectButtonProps> = ({
  icon,
  text,
  value,
  error = false,
  modalRoute,
  stackPosition = StackPositions.MIDDLE,
  style,
  ...props
}) => {
  const styles = useThemedStyles((theme) =>
    getStyles(theme, stackPosition, error)
  );

  return (
    <StyledTouchableOpacity
      style={[styles.container, style]}
      {...props}
      onPress={() => router.push(modalRoute)}
    >
      <View style={styles.iconName}>
        <FontAwesome6
          name={icon}
          size={18}
          color={styles.iconColor.color}
          solid
        />
        <StyledText text={text} />
      </View>
      <View style={styles.valueContainer}>
        <StyledText
          text={value}
          style={styles.valueStyle}
          ellipsizeMode="tail"
          numberOfLines={1}
        />
        <FontAwesome6
          name="chevron-right"
          size={18}
          color={styles.chevronColor.color}
        />
      </View>
    </StyledTouchableOpacity>
  );
};

const getStyles = (
  theme: Theme,
  stackPosition: StackPositions,
  error: boolean
) =>
  StyleSheet.create({
    container: {
      justifyContent: "space-between",
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.white,
      ...getBorderRadius(stackPosition),
      borderColor: error ? theme.colors.red : theme.colors.white,
      borderWidth: error ? 1 : 0,
      paddingHorizontal: 13,
      paddingVertical: 16,
    },
    iconName: {
      flexDirection: "row",
      gap: 10,
    },
    iconColor: {
      color: theme.colors.black,
    },
    valueContainer: {
      maxWidth: "60%",
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    valueStyle: {
      textAlign: "right",
      color: theme.colors.grayer,
      marginTop: -3,
    },
    chevronColor: {
      color: theme.colors.grayer,
    },
  });

const getBorderRadius = (position: StackPositions) => {
  switch (position) {
    case "top":
      return {
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      };
    case "middle":
      return {
        borderRadius: 0,
      };
    case "bottom":
      return {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
      };
    default:
      return {
        borderRadius: 15,
      };
  }
};
