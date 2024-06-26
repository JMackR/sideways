import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Flex } from '../flex';
import { Text } from 'react-native';

describe('Flex component', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <Flex>
        <Text>Test Child</Text>
      </Flex>,
    );
    expect(getByText('Test Child')).toBeTruthy();
  });

  it('calls touchUpInsideHandler on touch end', () => {
    const mockHandler = jest.fn();
    const { getByTestId } = render(
      <Flex testID="test-id" touchUpInsideHandler={mockHandler}>
        <Text>Test Child</Text>
      </Flex>,
    );
    const flexContainer = getByTestId('test-id');
    fireEvent(flexContainer, 'touchEnd');
    expect(mockHandler).toHaveBeenCalledTimes(1);
  });
});
