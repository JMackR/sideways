import type { ViewStyle } from 'react-native';

export const shadow = {
  /** Adds the standard drop shadow style */
  shadow: {
    elevation: 2,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 7,
  } as ViewStyle,
  screenShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 7,
    elevation: 6,
  } as ViewStyle,
  topShadow: {
    shadowOpacity: 0.5,
    shadowRadius: -5,
    shadowOffset: {
      width: 0,
      height: -15,
    },
    shadowColor: '#000000',
    elevation: 10,
    borderRadius: 7,
  } as ViewStyle,
};
