import React from 'react';
import { render } from '@testing-library/react-native';
import { GenericErrorFallback } from '../generic-error-fallback';
import RNRestart from 'react-native-restart';

jest.mock('react-native-restart', () => ({
  restart: jest.fn(),
}));
const mockRestart = jest.spyOn(RNRestart, 'restart');

describe('GenericErrorFallback', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders with default message', () => {
    const { getByText } = render(<GenericErrorFallback />);
    expect(getByText('404 - An error occurred. Please try reloading the app.')).toBeTruthy();
  });

  test('renders with custom message', () => {
    const { getByText } = render(<GenericErrorFallback message="Custom error message" />);
    expect(getByText('Custom error message')).toBeTruthy();
  });
});
