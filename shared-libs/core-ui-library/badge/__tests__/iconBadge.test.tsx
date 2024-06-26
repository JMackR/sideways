import { render } from '@testing-library/react-native';
import { IconBadge } from '../icon-badge';

jest.mock('../../Background-container', () => {
  return {
    __esModule: true,
    BackgroundContainer: jest.fn(() => null),
  };
});

jest.mock('../../image', () => {
  return {
    __esModule: true,
    SVG: jest.fn(() => null),
  };
});

describe('IconBadge Component', () => {
  test('renders correctly with custom icon and testID', () => {
    const customIcon = {
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" />
        </svg>
      ),
    };
    const { getByTestId } = render(<IconBadge icon={{ SVG: customIcon.svg }} testID="custom-icon-badge" />);
    const iconBadge = getByTestId('custom-icon-badge');
    expect(iconBadge).toBeDefined();
  });
  test('renders correctly with default testID if not provided', () => {
    const { getByTestId } = render(<IconBadge icon={{ SVG: {} }} />);
    const iconBadge = getByTestId('icon-badge');
    expect(iconBadge).toBeDefined();
  });
});
