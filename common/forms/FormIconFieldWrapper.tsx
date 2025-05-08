import useThemedStyles from "@/components/Common/StyledComponents/hooks/useThemedStyles";
import StyledText from "@/components/Common/StyledComponents/StyledText";
import CustomTheme from "@/components/Themes/themeType";
import { FontAwesome6 } from "@expo/vector-icons";
import { FC, ReactNode } from "react";
import { StyleSheet, View } from "react-native";

type FormIconFieldWrapperProps = {
  children?: ReactNode;
  iconName: string;
  title: string;
  tooltip?: string;
};

const FormIconFieldWrapper: FC<FormIconFieldWrapperProps> = ({
  children,
  iconName,
  title,
}) => {
  const styles = useThemedStyles(getStyles);

  return (
    <View
      style={{
        ...styles.formElementContainer,
      }}
    >
      <View style={styles.formElementTitleContainer}>
        <FontAwesome6 name={iconName} style={styles.formElementTitleIcon} />
        <StyledText content={title} weight="700" />
      </View>
      {children}
    </View>
  );
};

export default FormIconFieldWrapper;

const getStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    formElementContainer: {
      height: 180,
      borderRadius: 14,
      marginVertical: 10,
      paddingHorizontal: 18,
      paddingVertical: 13,
      backgroundColor: theme.colors.white,
      borderWidth: 1,
    },
    formElementTitleContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    formElementTitleIcon: {
      fontSize: 17,
      paddingRight: 10,
      fontWeight: "900",
    },
    formTextInput: {
      fontSize: 16,
      marginTop: "5%",
      padding: 10,
      width: "50%",
      alignContent: "flex-end",
      borderRadius: 7,
      textAlign: "right",
    },
  });
