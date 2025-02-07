import { Theme } from "@react-navigation/native";
import { Image, ImageProps, useImage } from "expo-image";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { FC } from "react";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import { StyledImageLoader } from "./StyledImageLoader";
import { MediaType } from "@/common/constants/mediaTypes";
import { StyledVideo } from "./StyledVideo";

type StyledImageProps = ImageProps & {
  loadingStyle?: StyleProp<ViewStyle>;
  uri: string;
  mediaType: MediaType;
};

export const StyledImage: FC<StyledImageProps> = ({
  style,
  loadingStyle,
  uri,
  mediaType,
  ...props
}) => {
  const image = useImage(uri, {});
  const styles = useThemedStyles(getStyles);

  if (mediaType === MediaType.VIDEO) {
    return <StyledVideo uri={uri} style={style as {}} contentFit="fill" />;
  }

  if (!image) {
    return <StyledImageLoader style={[styles.image, style as {}]} />;
  }

  return <Image source={image} style={[styles.image, style]} {...props} />;
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    image: {
      backgroundColor: theme.colors.gray,
    },
  });
