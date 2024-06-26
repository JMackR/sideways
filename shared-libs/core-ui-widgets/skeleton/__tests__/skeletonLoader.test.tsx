import React from 'react';
import { render } from '@testing-library/react-native';
import { SkeletonLoader } from '../skeleton';

jest.mock('@upward/themes', () => {
  let colorTheme = 'light_mode';

  return {
    useTheme: jest.fn().mockImplementation(() => ({ colorThemeId: colorTheme })),
    useColor: jest.fn().mockImplementation(() => ({
      colors: {
        altBackground: colorTheme === 'dark_mode' ? '#FFFFFF' : '#000000',
        faceIDLightBackground: colorTheme === 'dark_mode' ? '#000000' : '#FFFFFF',
        darkBackground: '#333333',
        lightBackground: '#F9F9F9',
      },
    })),
    setTestColorTheme: (theme: string) => {
      colorTheme = theme;
    },
  };
});

jest.mock('react-native-reanimated-skeleton', () => {
  return {
    __esModule: true,
    default: jest.fn(() => null),
  };
});

jest.mock('@upward/core-ui-library', () => {
  return {
    Margin: jest.fn(({ children }) => children),
  };
});

describe('SkeletonLoader component', () => {
  it('renders correctly with light theme', () => {
    require('@upward/themes').setTestColorTheme('light_mode');

    const mockProps = {
      componentStyle: { topNavigationSkeletonContainer: { backgroundColor: 'red' } },
      skeletonData: [
        { contentContainerStyle: { margin: 10 }, layout: { width: 100, height: 20 } },
        { contentContainerStyle: { margin: 20 }, layout: { width: 200, height: 30 } },
      ],
      columns: 2,
    };

    const { getByTestId } = render(<SkeletonLoader {...mockProps} />);

    const skeletonLoaderContainer = getByTestId('skeletonLoaderContainer');
    expect(skeletonLoaderContainer).toBeDefined();
  });

  it('renders correctly with dark theme', () => {
    require('@upward/themes').setTestColorTheme('dark_mode');

    const mockProps = {
      componentStyle: { topNavigationSkeletonContainer: { backgroundColor: 'red' } },
      skeletonData: [
        { contentContainerStyle: { margin: 10 }, layout: { width: 100, height: 20 } },
        { contentContainerStyle: { margin: 20 }, layout: { width: 200, height: 30 } },
      ],
      columns: 2,
    };

    const { getByTestId } = render(<SkeletonLoader {...mockProps} />);

    const skeletonLoaderContainer = getByTestId('skeletonLoaderContainer');
    expect(skeletonLoaderContainer).toBeDefined();
  });
});
