import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Dropdown } from '../dropdown';

describe('Dropdown', () => {
  const items = [
    { label: 'Item 1', value: 'item1' },
    { label: 'Item 2', value: 'item2' },
    { label: 'Item 3', value: 'item3' },
  ];

  it('renders correctly with default props', () => {
    const { getByTestId } = render(
      <Dropdown items={[]} testID={'text'} background={'baseBackground'} color={'alwaysDark'} />,
    );
    expect(getByTestId('text')).toBeTruthy();
  });

  it('renders title correctly when provided', () => {
    const { getByText } = render(
      <Dropdown title="Test Title" items={[]} testID={''} background={'baseBackground'} color={'alwaysDark'} />,
    );
    expect(getByText('Test Title')).toBeTruthy();
  });

  it('renders placeholder correctly when provided', () => {
    const { getByText } = render(
      <Dropdown
        placeholder="Select an item"
        items={[]}
        testID={''}
        background={'baseBackground'}
        color={'alwaysDark'}
      />,
    );
    expect(getByText('Select an item')).toBeTruthy();
  });

  it('toggles dropdown open/close on press', () => {
    const { getByTestId, queryByText } = render(
      <Dropdown items={items} testID={'text'} background={'baseBackground'} color={'alwaysDark'} />,
    );
    fireEvent.press(getByTestId('text'));
    expect(queryByText('Item 1')).toBeTruthy();
  });
});
