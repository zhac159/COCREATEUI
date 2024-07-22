import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import Slider from '@react-native-community/slider';

type OpinionSliderProps = {
  onValueChange: (value: number) => void;
  value: number;
};

const OpinionSlider: FC<OpinionSliderProps> = ({ onValueChange, value }) => {
  return (
    <View style={styles.container}>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={100}
        value={value}
        onValueChange={onValueChange}
        minimumTrackTintColor="#307ecc"
        maximumTrackTintColor="#000000"
      />
    </View>
  );
};

export default OpinionSlider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
});