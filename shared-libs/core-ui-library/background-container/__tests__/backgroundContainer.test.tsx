import React from 'react';
import { render } from '@testing-library/react-native';
import { BackgroundContainer } from '../background-container';

jest.mock('@upward/themes/hooks', () => ({
  useColorForBackgroundColor: jest.fn((color) => color),
  useColorForTextColor: jest.fn((color) => color),
  useFontForTextType: jest.fn((type) => type),
}));
jest.mock('@upward/themes', () => ({
  ...jest.requireActual('@upward/themes'),
  shadow: {
    screenShadow: jest.fn((shadowColor) => shadowColor),
  },
}));

describe('BackgroundContainer Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly with default props', () => {
    const { getByTestId } = render(<BackgroundContainer testID="background-container" topRadiusOnly={false} />);
    const container = getByTestId('background-container');
    expect(container).toBeDefined();
  });

  test('renders correctly with custom props', () => {
    const { getByTestId } = render(
      <BackgroundContainer
        type="customType"
        topRadiusOnly
        borderRadius={10}
        borderColor="customBorderColor"
        showShadow
        testID="custom-background"
      ></BackgroundContainer>,
    );
    const container = getByTestId('custom-background');
    expect(container).toBeDefined();
  });
});
