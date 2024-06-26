import React from 'react';
import { Text } from '@upward/core-ui-library';
import { Dialog } from '../dialog';
import { fireEvent, render } from '@testing-library/react-native';
import { TouchableOpacity, View } from 'react-native';

const mockOnPress = jest.fn();

describe('Dialog', () => {
  it('renders correctly with default props', () => {
    const { getByTestId } = render(<Dialog />);
    const dialogScrim = getByTestId('margin');
    expect(dialogScrim).toBeTruthy();
  });

  it('renders children correctly', () => {
    const { getByTestId } = render(
      <Dialog>
        <View testID="children"></View>
      </Dialog>,
    );
    expect(getByTestId('children')).toBeTruthy();
  });

  it('calls onPress when TouchableOpacity is pressed', () => {
    const { getByTestId } = render(<Dialog onPress={mockOnPress} />);
    const dialog = getByTestId('margin');
    fireEvent.press(dialog);
    expect(mockOnPress).toHaveBeenCalled();
  });
});
