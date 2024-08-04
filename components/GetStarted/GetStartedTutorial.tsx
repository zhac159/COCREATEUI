import { FormPageProps } from "@/common/forms/formsHelper";
import React, { FC } from "react";
import { StyleSheet, ImageBackground } from "react-native";
import { useTheme } from "../Themes/theme";
import StyledButton from "../Common/StyledButton";
import {
  windowHeight,
  windowWidth,
} from "../Account/Common/getWindowDimensions";

type GetStartedTutorialProps = {
  tutorialNumber: number;
};

const GetStartedTutorial: FC<FormPageProps & GetStartedTutorialProps> = ({
  nextStep,
  tutorialNumber,
}) => {
  const theme = useTheme();

  const tutorialImages: { [key: number]: any } = {
    1: require("../../assets/images/tutorial/tutorial-1.jpg"),
    2: require("../../assets/images/tutorial/tutorial-2.jpg"),
    3: require("../../assets/images/tutorial/tutorial-3.jpg"),
    4: require("../../assets/images/tutorial/tutorial-4.jpg"),
  };

  return (
    <ImageBackground
      source={tutorialImages[tutorialNumber]}
      style={styles.image}
    >
      <StyledButton
        text="Next"
        onPress={() => nextStep?.()}
        style={{
          bottom: "10%",
          position: "absolute",
          backgroundColor: theme.colors.darkOrange,
        }}
        icon="arrow-right"
      />
    </ImageBackground>
    // <View style={{ ...styles.container, backgroundColor: theme.colors.black }}>
    //   <Media uri={} style={undefined}      />
    //   <Text
    //     style={{
    //       ...theme.customFonts.primary.medium,
    //       color: theme.colors.white,
    //       fontSize: 40,
    //       lineHeight: 48,
    //     }}
    //   >
    //     {message}
    //   </Text>

    // </View>
  );
};

export default GetStartedTutorial;

const styles = StyleSheet.create({
  image: {
    width: windowWidth,
    height: windowHeight + 100,
    position: "absolute",
    resizeMode: "cover",
  },
});
