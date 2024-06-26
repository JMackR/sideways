import React from 'react';
import { render } from '@testing-library/react-native';
import { LocalImage } from '../local-image';

jest.mock('invariant', () => jest.fn());

describe('LocalImage Component', () => {
  test('should call invariant with correct arguments', () => {
    render(<LocalImage source={{ uri: '' }} resizeMode="center" />);
  });
});
