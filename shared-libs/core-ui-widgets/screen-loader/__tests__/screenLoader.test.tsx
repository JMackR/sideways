import React from 'react';
import { render } from '@testing-library/react-native';
import { ScreenLoader } from '../screen-loader';

export const useColorsForBackgroundColorsCollection = jest.fn().mockReturnValue(['#FFFFFF']);

describe('ScreenLoader component', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<ScreenLoader />);
    const activityIndicator = getByTestId('activityIndicator');
    expect(activityIndicator).toBeDefined();
  });
});
