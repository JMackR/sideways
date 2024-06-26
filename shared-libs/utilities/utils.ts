import { useCallback, useState } from 'react';
import { Dimensions, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
// import DeviceInfo from 'react-native-device-info';

export const isEmpty = (value: any) => {
  return (
    value == null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  );
};

export const omit = (obj: any, props: any) => {
  obj = { ...obj };
  props.forEach((prop: any) => delete obj[prop]);
  return obj;
};
export const checkIndexIsEven = (n: number) => {
  return n % 2 == 0;
};

// Sizes
export const BANNER_H = 350;
export const TOPNAVI_H = 50;
export const WINDOW_WIDTH = Dimensions.get('window').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;

// Animations
export const FadeOut = (scroll: any, scrollDistance: any) => {
  return scroll.interpolate({
    inputRange: [0, scrollDistance / 2],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
};

// Device Types
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const isWindows = Platform.OS === 'windows';
export const isTablet = DeviceInfo.isTablet();

export const useComponentSize = () => {
  const [size, setSize] = useState();

  const onLayout = useCallback((event: any) => {
    const { width, height } = event.nativeEvent.layout;
    setSize({ width, height });
  }, []);

  return [size, onLayout];
};
