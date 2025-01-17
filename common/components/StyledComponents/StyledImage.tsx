import { Theme } from "@react-navigation/native";
import { Image, ImageProps, useImage } from "expo-image";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { FC } from "react";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import * as Progress from "react-native-progress";

type StyledImageProps = ImageProps & {
  loadingStyle?: StyleProp<ViewStyle>;
};

export const StyledImage: FC<StyledImageProps> = ({
  source,
  style,
  loadingStyle,
  ...props
}) => {
  const image = useImage(source, {});
  const styles = useThemedStyles(getStyles);

  if (!image) {
    return (
      <Progress.Circle
        size={100}
        indeterminate={true}
        thickness={50}
        style={[styles.loading, loadingStyle]}
      />
    );
  }

  return (
    <Image
      source={image}
      style={[
        styles.image,
        style,
      ]}
      {...props}
    />
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    image: {
      backgroundColor: theme.colors.gray,
    },
    loading: {
      ...StyleSheet.absoluteFillObject,
      alignItems: "center",
      justifyContent: "center",
      zIndex: -1,
      backgroundColor: theme.colors.gray,
    },
  });
