import { FC } from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { Theme } from "@react-navigation/native";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import { FontAwesome6 } from "@expo/vector-icons";
import StyledText from "../StyledComponents/StyledText";
import { router, Route } from "expo-router";
import { StackPositions } from "@/common/constants/stackPostitions";
import { StyledTouchableOpacity } from "../StyledComponents/StyledTouchableOpacity";

type ModalFormRedirectButtonProps = ViewProps & {
  icon: string;
  text: string;
  value: string;
  modalRoute: Route;
  stackPosition?: StackPositions;
};

export const ModalFormRedirectButton: FC<ModalFormRedirectButtonProps> = ({
  icon,
  text,
  value,
  modalRoute,
  stackPosition = StackPositions.MIDDLE,
  style,
  ...props
}) => {

  const styles = useThemedStyles((theme) => getStyles(theme, stackPosition));

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
        <StyledText text={value} style={styles.valueStyle} />
        <FontAwesome6
          name="chevron-right"
          size={18}
          color={styles.chevronColor.color}
        />
      </View>
    </StyledTouchableOpacity>
  );
};

const getStyles = (theme: Theme, stackPosition: StackPositions) =>
  StyleSheet.create({
    container: {
      justifyContent: "space-between",
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.white,
      ...getBorderRadius(stackPosition),
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
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    valueStyle: {
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
