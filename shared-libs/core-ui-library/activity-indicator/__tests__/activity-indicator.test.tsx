import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Animated } from 'react-native';
import { ActivityIndicator } from '../activity-indicator';

// Mock the useColorTheme hook
jest.mock('@upward/themes', () => ({
  useColorTheme: () => ({
    colors: {
      brand: 'blue',
    },
    animation: {
      scale: 1,
    },
  }),
}));

describe('ActivityIndicator', () => {
  it('renders correctly with default props', () => {
    const { getByTestId } = render(<ActivityIndicator />);
    expect(getByTestId('activity-indicator')).toBeTruthy();
  });

  // it('hides when animating is false and hidesWhenStopped is true', () => {
  //   const { getByTestId } = render(<ActivityIndicator animating={false} hidesWhenStopped={true} />);
  //   // Since we mocked Animated.timing, we can't test the actual animation, but we can check the opacity
  //   expect(getByTestId('activity-indicator').props.style).toContainEqual([{ justifyContent: 'center',
  //   alignItems: 'center', opacity: 0 }]);
  // });

  // it('shows when animating is true', () => {
  //   const { getByTestId } = render(<ActivityIndicator animating={true} />);
  //   // Check that the component is visible
  //   expect(getByTestId('activity-indicator').props.style).toContainEqual({ opacity: 1 });
  // });

  // it('uses the provided color', () => {
  //   const customColor = 'red';
  //   const { getByTestId } = render(<ActivityIndicator color={customColor} animating={true} />);
  //   // Check that the color prop is passed correctly to the child components
  //   // You might need to adjust the query to find the specific child that uses the color prop
  //   expect(getByTestId('activity-indicator').props.style).toContainEqual({ borderColor: customColor });
  // });

  // it('uses the default size when no size is provided', () => {
  //   const { getByTestId } = render(<ActivityIndicator animating={true} />);
  //   // Check that the default size is used
  //   expect(getByTestId('activity-indicator').props.style).toContainEqual({ width: 16, height: 16 });
  // });

  // it('uses the provided size when given', () => {
  //   const customSize = 30;
  //   const { getByTestId } = render(<ActivityIndicator size={customSize} animating={true} />);
  //   // Check that the provided size is used
  //   expect(getByTestId('activity-indicator').props.style).toContainEqual({ width: customSize, height: customSize });
  // });

  // Add more tests as needed to cover different props and edge cases
});
