import { useColorForBackgroundColor } from '@upward/themes';
import { Platform } from 'react-native';
import { isTablet } from 'react-native-device-info';
import {
  Easing,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export const useAnimation = () => {
  const height = Platform.OS === 'ios' ? (isTablet() ? 100 : 52) : isTablet() ? 120 : 52;
  const tabletTranslateYOffset = isTablet() ? (Platform.OS === 'ios' ? 0 : 20) : Platform.OS === 'ios' ? 0 : 5;
  const titleTranslateY = isTablet() ? 0 : 10;
  const curveVisibility = useSharedValue(1);
  const headerVisibility = useSharedValue(1);
  const translateY = useSharedValue(0);
  const headerTranslateY = useSharedValue(1);
  const titleVisibility = useSharedValue(0);
  const offset = useSharedValue(height);
  const backgroundColor = useColorForBackgroundColor('curveContainer');
  const offsetHeight = 42;

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const y = event.contentOffset.y;
      if (y > 100) {
        curveVisibility.value = withTiming(0, {
          duration: 500,
          easing: Easing.inOut(Easing.quad),
        });
        headerVisibility.value = withTiming(1, {
          easing: Easing.inOut(Easing.quad),
        });
        translateY.value = withTiming(-height + tabletTranslateYOffset, {
          easing: Easing.inOut(Easing.quad),
        });
        headerTranslateY.value = withTiming(titleTranslateY, {
          easing: Easing.inOut(Easing.quad),
        });
        titleVisibility.value = withTiming(1, {
          easing: Easing.inOut(Easing.quad),
        });

        offset.value = withTiming(offsetHeight);
      } else if (y < 100) {
        curveVisibility.value = withTiming(1);
        headerVisibility.value = withTiming(0);
        translateY.value = withTiming(0);
        titleVisibility.value = withTiming(0);
        offset.value = withTiming(height);
        headerTranslateY.value = withTiming(-100);
      }
    },
  });

  const animatedCurveStyle = useAnimatedStyle(() => {
    return {
      opacity: curveVisibility.value,
    };
  });
  const animatedHeaderStyle = useAnimatedStyle(() => {
    return {
      opacity: curveVisibility.value,
    };
  });
  const animatedHeaderHeight = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      flexBasis: offset.value,
      backgroundColor: backgroundColor,
    };
  });
  const animatedTitleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: headerTranslateY.value }],
      opacity: titleVisibility.value,
      backgroundColor: backgroundColor,

      // height: 43,
    };
  });

  return {
    scrollHandler,
    animatedCurveStyle,
    animatedHeaderStyle,
    animatedHeaderHeight,
    animatedTitleStyle,
  };
};
