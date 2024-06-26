import React from 'react';
import { render } from '@testing-library/react-native';
import { NoResults } from '../no-results';
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

describe('NoResults component', () => {
  it('renders no results text correctly', () => {
    const { getByTestId, getByText } = render(<NoResults />);
    const noResultsText = getByTestId('noResultsText');
    expect(noResultsText).toBeDefined();
    expect(getByText('member.NO_RESULTS_TXT')).toBeDefined();
  });
});
