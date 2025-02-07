import { FC } from "react";
import { useGetMedia } from "../../hooks/useGetMedia";
import { StyledImage } from "../StyledComponents/StyledImage";
import { View, StyleSheet, ViewProps } from "react-native";
import { Theme } from "@react-navigation/native";
import useThemedStyles from "../../theme/getThemedStylesheet";
import StyledIconButton from "../StyledComponents/StyledIconButton";
import StyledText from "../StyledComponents/StyledText";
import { MediaUpdateDTO } from "@/api/model";

type ImageFormFieldProps = ViewProps & {
  description?: string;
  title?: string;
  value?: MediaUpdateDTO;
  onChange: (value: MediaUpdateDTO) => void;
};

export const ImageFormField: FC<ImageFormFieldProps> = ({
  description,
  title,
  value,
  style: containerStyle,
  onChange,
  ...props
}) => {
  const style = useThemedStyles(getStyles);
  const { pickImage } = useGetMedia();

  return (
    <View style={[style.container, containerStyle]} {...props}>
      {value && (
        <StyledImage
          uri={value.uri}
          mediaType={value.mediaType}
          style={style.styledImage}
          loadingStyle={style.loading}
        />
      )}
      <View style={style.nonImageContainer}>
        <StyledIconButton
          iconName="image"
          style={style.icon}
          onPress={async () => {
            const result = await pickImage();
            if (result) {
              onChange({
                ...value,
                uri: result.uri,
                mediaType: result.type,
              });
            }
          }}
        />
        {!value && (
          <View style={style.textContainer}>
            {title && <StyledText text={title} />}
            {description && (
              <StyledText text={description} style={style.description} />
            )}
          </View>
        )}
      </View>
    </View>
  );
};
const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      borderColor: theme.colors.black,
      overflow: "hidden",
      width: "100%",
      aspectRatio: 1,
      gap: 10,
      borderWidth: 1,
      borderRadius: 8,
    },
    icon: {
      width: 10,
      height: 10,
      borderRadius: 25,
    },
    nonImageContainer: {
      alignSelf: "center",
      justifyContent: "center",
      position: "absolute",
      height: "100%",
    },
    textContainer: {
      alignItems: "center",
      zIndex: 100,
      top: 50,
    },
    description: {
      color: theme.colors.grayer,
      width: "50%",
      textAlign: "center",
      fontSize: 13,
    },
    loading: { borderRadius: 15 },
    styledImage: {
      width: "100%",
      aspectRatio: 1,
      borderRadius: 8,
    },
  });
