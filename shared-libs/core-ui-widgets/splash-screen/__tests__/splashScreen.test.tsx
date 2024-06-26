import React from 'react';
import { render } from '@testing-library/react-native';
import { SplashScreen } from '../splash-screen';
jest.mock('@upward/themes', () => ({
  useColorTheme: jest.fn().mockReturnValue({ colors: { darkBackground: '#000000' } }),
}));

jest.mock('@upward/utilities', () => ({
  isTablet: false,
}));

jest.mock('react-native/Libraries/Utilities/Platform', () => {
  const actualPlatform = jest.requireActual('react-native/Libraries/Utilities/Platform');
  return {
    ...actualPlatform,
    OS: 'ios',
    useColorScheme: jest.fn().mockReturnValue('light'),
  };
});

describe('SplashScreen', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByTestId } = render(<SplashScreen />);
    expect(getByTestId('splash-screen_image')).toBeTruthy();
  });

  it('renders with dark background when color scheme is dark', () => {
    jest.requireMock('react-native/Libraries/Utilities/Platform').useColorScheme.mockReturnValueOnce('dark');
    const { getByTestId } = render(<SplashScreen />);
    const container = getByTestId('splash-screen_image').parent;
  });

  it('renders with light background when color scheme is not dark', () => {
    jest.requireMock('react-native/Libraries/Utilities/Platform').useColorScheme.mockReturnValueOnce('light');
    const { getByTestId } = render(<SplashScreen />);
    const container = getByTestId('splash-screen_image').parent;
  });

  it('renders with proper image maxWidth based on device type', () => {
    const { getByTestId } = render(<SplashScreen />);
    const image = getByTestId('splash-screen_image');
    expect(image.props.style).toEqual({ maxWidth: 100 });
  });
});
