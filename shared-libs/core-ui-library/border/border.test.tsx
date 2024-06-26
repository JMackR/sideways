import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Border } from './border'; // Adjust the import path as necessary
import { useColorForBackgroundColor } from '@upward/themes';

// Mock the hooks from @upward/themes
jest.mock('@upward/themes', () => ({
  useBorder: () => ({
    baseBorder: {
      cornerRadius: {
        small: 4,
        large: 8,
      },
      lineWeight: {
        light: 1,
        heavy: 3,
      },
    },
  }),
  useColorForBackgroundColor: jest.fn(),
  useColorTheme: jest.fn(),
}));

// Mock useColorForBackgroundColor to return a color based on the input
const mockUseColorForBackgroundColor = require('@upward/themes').useColorForBackgroundColor;
mockUseColorForBackgroundColor.mockImplementation((color: string) => color || 'primary');

describe('Border', () => {
  it('renders correctly with default props', () => {
    const { getByTestId } = render(
      <Border lineWeight="light" hidden={true} color={'borderColor'} children={undefined} />,
    );
    expect(getByTestId('border-view')).toBeTruthy();
  });

  it('applies the correct border styles based on props', () => {
    const { getByTestId } = render(
      <Border cornerRadius="small" lineWeight="heavy" color="primary" borderType="dashed" width={100} height={50}>
        <></>
      </Border>,
    );
    const borderView = getByTestId('border-view');
    expect(borderView.props.style).toMatchObject({
      borderRadius: 4,
      borderWidth: 3,
      borderColor: 'primary',
      borderStyle: 'dashed',
      width: 100,
      height: 50,
    });
  });

  it('handles touch events when touchUpInsideHandler is provided', () => {
    const mockHandler = jest.fn();
    const { getByTestId } = render(
      <Border cornerRadius="large" lineWeight="none" touchUpInsideHandler={mockHandler} color={'borderColor'}>
        <></>
      </Border>,
    );
    fireEvent(getByTestId('border-press'), 'onPressOut');
    expect(mockHandler).toHaveBeenCalled();
  });

  it('applies the layout on the wrapper view and sets the size', () => {
    const { getByTestId } = render(<Border color={'borderColor'} cornerRadius="circle" children={undefined}></Border>);
    const borderView = getByTestId('border-view');
    fireEvent(borderView, 'onLayout', { nativeEvent: { layout: { height: 10, width: 9 } } });
    expect(borderView.props.style.borderRadius).toEqual(4.5);
  });
});
