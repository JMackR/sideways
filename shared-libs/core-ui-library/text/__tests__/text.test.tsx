import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Text } from '../text';

describe('Text', () => {
  it('renders correctly with children', () => {
    const { getByTestId } = render(<Text>Hello, World!</Text>);
    const text = getByTestId('text');
    expect(text).toBeDefined();
    expect(text.props.children).toBe('Hello, World!');
  });

  it('applies text type styles', () => {
    const { getByTestId } = render(<Text textType="bodyBold1">Hello, World!</Text>);
    const text = getByTestId('text');
    expect(text.props.style[0].fontSize).toBe(15);
  });

  it('applies custom text color', () => {
    const { getByTestId } = render(<Text color="brandAlt">Hello, World!</Text>);
    const text = getByTestId('text');
    expect(text.props.style[1].color).toBe('#FFFFFF');
  });

  it('applies text shadow when dropShadow is true', () => {
    const { getByTestId } = render(<Text dropShadow={true}>Hello, World!</Text>);
    const text = getByTestId('text');
    expect(text.props.style[2]).toBeDefined();
  });

  // Add more tests as needed
});
