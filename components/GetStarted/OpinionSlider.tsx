import React, { FC, memo } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import { useTheme } from "../Themes/theme";
import { useTranslation } from "react-i18next";

type OpinionSliderProps = {
  opinionIndex: number;
  onValueChange: (value: number) => void;
};

const OpinionSlider: FC<OpinionSliderProps> = ({
  opinionIndex,
  onValueChange,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text
        style={{
          ...theme.customFonts.primary,
          color: theme.colors.black,
          fontWeight: "700",
          fontSize: 22,
        }}
      >
        {opinionIndex.toString() +
          ". " +
          t(`get-started.survey.opinions.${opinionIndex.toString() as "2"}`)}
      </Text>
      <Slider
        trackStyle={{
          height: 12,
          backgroundColor: theme.colors.lightGray,
          borderRadius: 6,
        }}
        trackClickable
        renderThumbComponent={() => null}
        renderAboveThumbComponent={() => null}
        renderBelowThumbComponent={() => null}
        minimumTrackStyle={{
          backgroundColor: theme.colors.primary,
          height: 15,
          borderRadius: 6,
        }}
        onValueChange={(state) => {
          onValueChange(state[0]);
        }}
        renderTrackMarkComponent={(int) => (
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Text
              style={{
                ...theme.customFonts.primary,
                color: theme.colors.black,
                fontWeight: "400",
                fontSize: 19,
                marginTop: 55,
              }}
            >
              {int + 1}
            </Text>
            {(int + 1 === 1 || int + 1 === 4 || int + 1 === 7) && (
              <Text
                style={{
                  ...theme.customFonts.primary,
                  color: theme.colors.black,
                  fontWeight: "700",
                  fontSize: 12,
                  position: "absolute",
                  marginTop: 90,
                  width: 70,
                  textAlign: "center",
                  marginRight: 10,

                }}
              >
                {t(`get-started.survey.markers.${(int + 1).toString() as "1"}`)}
              </Text>
            )}
          </View>
        )}
        trackMarks={[1, 2, 3, 4, 5, 6, 7]}
        minimumValue={1}
        maximumValue={7}
      />
    </View>
  );
};

export default memo(OpinionSlider);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  slider: {
    width: "100%",
    height: 40,
  },
});
