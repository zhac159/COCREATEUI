import { Theme } from "@react-navigation/native";
import { Image, ImageProps, useImage } from "expo-image";
import { StyleSheet, Text } from "react-native";
import { FC } from "react";
import useThemedStyles from "@/common/theme/getThemedStylesheet";

type StyledImageProps = ImageProps & {};

export const StyledImage: FC<StyledImageProps> = ({
  source,
  style,
  ...props
}) => {
  const image = useImage(source);
  const styles = useThemedStyles(getStyles);

  if (!image) {
    return <Text>Image is loading...</Text>;
  }

  return (
    <Image
      source={image}
      style={[{ width: image.width / 2, height: image.height / 2 }, style]}
      {...props}
    />
  );
};

const getStyles = (theme: Theme) => StyleSheet.create({});
