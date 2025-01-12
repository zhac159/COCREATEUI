import useThemedStyles from "@/common/theme/getThemedStylesheet";
import { Theme } from "@react-navigation/native";
import { FC } from "react";
import {
  ImageBackground,
  View,
  StyleSheet,
  ImageBackgroundProps,
} from "react-native";

type StyledImageBackgroundProps = ImageBackgroundProps & {
  blackLayer?: boolean;
};

export const StyledImageBackground: FC<StyledImageBackgroundProps> = ({
  blackLayer,
  children,
  style,
  ...props
}) => {
  const styles = useThemedStyles(getStyles);

  return (
    <ImageBackground style={style} {...props}>
      {blackLayer && <View style={styles.blackHalfOpacityBackdrop} />}
      {children}
    </ImageBackground>
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    blackHalfOpacityBackdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: theme.colors.black,
      opacity: 0.5,
    },
  });
