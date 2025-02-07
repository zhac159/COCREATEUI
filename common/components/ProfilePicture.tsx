import { FC } from "react";
import { StyleSheet } from "react-native";
import { Theme } from "@react-navigation/native";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import { ImageProps } from "expo-image";
import { StyledImage } from "./StyledComponents/StyledImage";
import { MediaType } from "../constants/mediaTypes";

type ProfilePictureProps = ImageProps & {};

export const ProfilePicture: FC<ProfilePictureProps> = ({
  style,
  ...props
}) => {
  const styles = useThemedStyles(getStyles);
  return (
    <StyledImage
      uri="https://picsum.photos/200/300"
      mediaType={MediaType.IMAGE}
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
