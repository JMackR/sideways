import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { render } from '@testing-library/react-native';
import { Separator } from '../separator';

describe('Separator', () => {
  it('renders a horizontal separator by default', () => {
    const { getByTestId } = render(<Separator />);
    const separator = getByTestId('separator');
    // Assert that the separator has correct styles for a horizontal separator
    expect(separator.props.style).toEqual({
      width: '100%',
      height: 1,
      borderBottomWidth: 0.5,
      borderBottomColor: '#454545',
      borderLeftColor: '#454545',
      borderLeftWidth: 0.5,
    });
  });

  it('renders a vertical separator when direction is set to "row"', () => {
    const { getByTestId } = render(<Separator direction="row" />);
    const separator = getByTestId('separator');
    // Assert that the separator has correct styles for a vertical separator
    expect(separator.props.style).toEqual({
      width: 1,
      height: '100%',
      borderBottomWidth: 0.5,
      borderBottomColor: '#454545',
      borderLeftColor: '#454545',
      borderLeftWidth: 0.5,
    });
  });
});
