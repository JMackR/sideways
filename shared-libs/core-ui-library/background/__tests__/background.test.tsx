import React from 'react';
import { render } from '@testing-library/react-native';
import { Background } from '../background';

jest.mock('@upward/themes/hooks', () => ({
  useColorForBackgroundColor: jest.fn((color) => color),
  useColorForTextColor: jest.fn((color) => color),
  useFontForTextType: jest.fn((type) => type),
}));
describe('Background Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly with default props', () => {
    const { getByTestId } = render(<Background children="" testID="background" />);
    const backgroundView = getByTestId('background');

    expect(backgroundView).toBeDefined();
    expect(backgroundView.props.style).toEqual({
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      opacity: 1.0,
      backgroundColor: 'primary',
      borderRadius: undefined,
    });
  });

  test('renders correctly with custom props', () => {
    const { getByTestId } = render(
      <Background type="custom" testID="custom-background" isOverlay borderRadius={10}></Background>,
    );
    const backgroundView = getByTestId('custom-background');
    expect(backgroundView).toBeDefined();
    expect(backgroundView.props.style).toEqual({
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      opacity: 0.8,
      backgroundColor: 'custom',
      borderRadius: 10,
    });
  });
});
