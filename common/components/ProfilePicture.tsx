import { FC } from "react";
import { StyleSheet } from "react-native";
import { Theme } from "@react-navigation/native";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import { ImageProps } from "expo-image";
import { StyledImage } from "./StyledComponents/StyledImage";

type ProfilePictureProps = ImageProps & {};

export const ProfilePicture: FC<ProfilePictureProps> = ({
  style,
  ...props
}) => {
  const styles = useThemedStyles(getStyles);
  return (
    <StyledImage
      source={{ uri: "https://picsum.photos/200/300" }}
      style={[styles.profilePicture, style]}
      {...props}
    />
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    profilePicture: {
      borderRadius: 50,
      aspectRatio: 1,
      height: "100%",
    },
  });
