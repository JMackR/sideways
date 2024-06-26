import React from 'react';
import { render } from '@testing-library/react-native';
import { Overlay } from '../overlay';
import { Text } from 'react-native';

describe('Overlay component', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <Overlay insetLeftStep={10} insetBottomStep={20}>
        <Text>Test Child</Text>
      </Overlay>,
    );
    expect(getByText('Test Child')).toBeTruthy();
  });
});
