import { useFontTheme } from '../../providers';
import { useMargin } from '../use-margin';

const MockFontTheme = {
  baseMargin: 5,
};

jest.mock('../../providers/font-theme-context-provider');
useFontTheme.mockReturnValue(MockFontTheme);

describe('useMargin hook returns correct values', () => {
  test('useMargin returns correct margin', () => {
    expect(useMargin().baseMargin).toStrictEqual(MockFontTheme.baseMargin);
  });
});
