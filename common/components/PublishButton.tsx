import { FC, useEffect } from 'react';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle,
  withSequence,
  withTiming,
  Easing
} from 'react-native-reanimated';
import StyledButton, { StyledButtonProps } from './StyledComponents/StyledButton';

type PublishButtonProps = StyledButtonProps & StyledButtonProps & {};

export const PublishButton: FC<PublishButtonProps> = ({ error, ...props }) => {
  const shakeAnimation = useSharedValue(0);

  useEffect(() => {
    if (error) {
      shakeAnimation.value = withSequence(
        withTiming(-6, { duration: 50, easing: Easing.linear }),
        withTiming(5, { duration: 50, easing: Easing.linear }),
        withTiming(-4, { duration: 60, easing: Easing.linear }),
        withTiming(3, { duration: 60, easing: Easing.linear }),
        withTiming(-2, { duration: 70, easing: Easing.linear }),
        withTiming(1, { duration: 70, easing: Easing.linear }),
      );
    }
  }, [error]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeAnimation.value }]
  }));

  return (
    <Animated.View style={animatedStyle}>
      <StyledButton error={error} {...props} />
    </Animated.View>
  );
};