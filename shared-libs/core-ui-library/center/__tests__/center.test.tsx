import React from 'react';
import { render } from '@testing-library/react-native';
import { Center } from '../center';
import { Flex } from '../../flex';

jest.mock('../../flex', () => ({
  Flex: jest.fn(({ children }) => children),
}));

describe('Center Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders children centered horizontally and vertically', () => {
    render(<Center data-testid="child"></Center>);
    expect(Flex).toHaveBeenCalledWith(
      {
        direction: 'row',
        axisDistribution: 'center',
        crossAxisDistribution: 'center',
        grow: 1,
      },
      {},
    );
  });
});
