import { render, waitFor } from '@testing-library/react-native';
import { Badge } from '../badge';
import { truncateAmount } from '../badge.common';

jest.mock('@upward/themes', () => ({
  useColorForBackgroundColor: jest.fn(() => 'error'),
}));

jest.mock('react-native', () => ({
  ...jest.requireActual('react-native'),
  PixelRatio: {
    getFontScale: jest.fn(() => 1.0),
  },
}));

jest.mock('../../text', () => ({
  Text: jest.fn(({ children }) => {
    children;
  }),
}));

describe('Badge Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('returns empty string for amount less than MinimumAmount', () => {
    expect(truncateAmount(0)).toBe('');
    expect(truncateAmount(-1)).toBe('');
  });

  test('returns amount as string for amount less than TruncateThreshold', () => {
    expect(truncateAmount(1)).toBe('1');
    expect(truncateAmount(50)).toBe('50');
    expect(truncateAmount(99)).toBe('99');
  });

  test('returns OverTruncateThreshold for amount greater than or equal to TruncateThreshold', () => {
    expect(truncateAmount(100)).toBe('99+');
    expect(truncateAmount(101)).toBe('99+');
    expect(truncateAmount(1000)).toBe('99+');
  });

  test('renders correctly with amount and shows border', async () => {
    const { getByTestId } = render(<Badge amount={12} showBorder testID="test-badge" />);
    expect(getByTestId('test-badge')).toBeDefined();
  });

  test('renders correctly without amount and border', async () => {
    const { queryByTestId } = render(<Badge amount={0} showBorder={false} testID="test-badge" />);
    await waitFor(() => {
      expect(queryByTestId('test-badge')).toBeNull();
    });
  });
});
