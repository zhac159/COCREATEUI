import { FC } from "react";
import { StyleSheet } from "react-native";
import { Theme } from "@react-navigation/native";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import { StyledImage, StyledImageProps } from "./StyledComponents/StyledImage";
import { MediaType } from "../constants/mediaTypes";

type ProfilePictureProps =  Omit<StyledImageProps, "mediaType"> & {};

export const ProfilePicture: FC<ProfilePictureProps> = ({
  style,
  uri,
  ...props
}) => {
  const styles = useThemedStyles(getStyles);
  return (
    <StyledImage
      uri={uri}
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
