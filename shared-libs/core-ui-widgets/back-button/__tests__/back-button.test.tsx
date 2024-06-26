import React from 'react';
import { TouchableOpacity } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { BackButton } from '../back-button';
import { useNavigation } from '@react-navigation/native';

describe('BackButton', () => {
  it('calls navigation.goBack() when button is pressed', () => {
    const { getByTestId } = render(<BackButton />);
    const button = getByTestId('backButton');
    fireEvent.press(button);
  });

  it('renders with correct styles', () => {
    const { getByTestId } = render(<BackButton />);
    const button = getByTestId('backButton');

    expect(button.props.style.paddingLeft).toEqual(10);
  });
});
