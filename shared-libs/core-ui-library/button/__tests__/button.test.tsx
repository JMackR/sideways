import { fireEvent, render, waitFor, screen } from '@testing-library/react-native';

import { Button, ButtonPropsBase } from '..';
import { View } from 'react-native';
import { LocalSVGSource } from 'shared-libs/core-ui-library';

jest.mock('@upward/themes/hooks', () => ({
  useFont: () => ({
    fonts: {
      bodyMedium1: { fontSize: 16 },
      bodyMedium2: { fontSize: 14 },
      bodyMedium3: { fontSize: 12 },
    },
  }),
  useColor: () => ({
    colors: {
      '#f0f': '#fff',
      transparent: 'transparent',
      opaque: 'white',
      altBackground: '#ccc',
      gray: '#c1c1c1',
    },
  }),
  useMargin: () => ({
    baseMargin: 8,
  }),

  useColorForBackgroundColor: jest.fn((color) => color),
  useColorForTextColor: jest.fn((color) => color),
  useFontForTextType: jest.fn((type) => type),
}));

jest.mock('@upward/utilities', () => ({
  ms: jest.fn((value) => value),
  vs: jest.fn((value) => value),
  maxPixelRatio: jest.fn((value) => value),
}));

jest.mock('../../activity-indicator', () => 'ActivityIndicator');
jest.mock('../../image', () => ({ SVG: 'SVG' }));

const click = jest.fn();
const longClick = jest.fn();

const renderComponent = (overrideProps: Partial<ButtonPropsBase> = {}) => {
  const props: ButtonPropsBase = {
    title: 'test',
    buttonSize: 'large',
    buttonType: 'primary',
    onClick: click,
    onLongClick: longClick,
    testID: 'button',
    ...overrideProps,
  };
  return render(<Button {...props} />);
};
it('apply disabled and floating-button buttontype and buttonSize', () => {
  renderComponent({ buttonSize: 'small', buttonType: 'disabled' });
  renderComponent({ buttonSize: 'medium', buttonType: 'inverse' });
  renderComponent({ buttonSize: 'floating', buttonType: 'floating-button' });
  renderComponent({ buttonSize: '', buttonType: 'dark' });
  renderComponent({ buttonSize: 'back', buttonType: 'back-button' });
});

const defaultProps: ButtonPropsBase = {
  title: 'test',
  buttonSize: 'large',
  buttonType: 'primary',
  onClick: click,
  onLongClick: longClick,
  testID: 'button',
};

describe('Button Functionality Tests', () => {
  it('Click calls passed in onClick function', () => {
    const { getByTestId } = renderComponent({ ...defaultProps });
    const button = getByTestId('button');
    waitFor(() => {
      fireEvent.press(button);
      expect(click).toHaveBeenCalledTimes(1);
    });
  });

  it('displays the title when provided', () => {
    const { getByText } = renderComponent({ ...defaultProps });
    expect(getByText('test')).toBeTruthy();
  });

  it('renders the right icon with jsx', () => {
    const jsxElement = <View testID="jsxElement"></View>;
    const { getByTestId } = render(<Button {...defaultProps} rightIcon={jsxElement} />);
    expect(getByTestId('jsxElement')).toBeTruthy();
  });

  it('renders the right icon with svg', () => {
    const localSVGSource: LocalSVGSource = { SVG: () => <svg></svg> };
    const { getByTestId } = render(<Button {...defaultProps} rightIcon={localSVGSource} />);
    expect(getByTestId('rightIconSVG')).toBeTruthy();
  });
  it('render the right icon when icon is not valid', () => {
    const { queryByTestId } = render(<Button {...defaultProps} rightIcon="not a valid icon" />);
    const centerIcon = queryByTestId('rightIconSVG');
    expect(centerIcon).toBeNull();
  });
  it('renders the center icon with jsx', () => {
    const jsxElement = <View testID="jsxElement"></View>;
    const { getByTestId } = render(<Button {...defaultProps} centerIcon={jsxElement} />);
    expect(getByTestId('jsxElement')).toBeTruthy();
  });

  it('renders the center icon with svg', () => {
    const localSVGSource: LocalSVGSource = { SVG: () => <svg></svg> };
    const { getByTestId } = render(<Button {...defaultProps} centerIcon={localSVGSource} />);
    expect(getByTestId('centerIconSVG')).toBeTruthy();
  });
  it('render the center icon when icon is not valid', () => {
    const { queryByTestId } = render(<Button {...defaultProps} centerIcon="not a valid icon" />);
    const centerIcon = queryByTestId('centerIconSVG');
    expect(centerIcon).toBeNull();
  });

  it('renders the left icon with jsx', () => {
    const jsxElement = <View testID="jsxElement"></View>;
    const { getByTestId } = render(<Button {...defaultProps} leftIcon={jsxElement} />);
    expect(getByTestId('jsxElement')).toBeTruthy();
  });

  it('renders the left icon with svg', () => {
    const localSVGSource: LocalSVGSource = { SVG: () => <svg></svg> };
    const { getByTestId } = render(<Button {...defaultProps} leftIcon={localSVGSource} />);
    expect(getByTestId('leftIconSVG')).toBeTruthy();
  });

  it('render the left icon when icon is not valid', () => {
    const { queryByTestId } = render(<Button {...defaultProps} leftIcon="not a valid icon" />);
    const centerIcon = queryByTestId('leftIcon');
    expect(centerIcon).toBeNull();
  });

  it('should start background color animation onPressIn', () => {
    const { getByTestId } = render(<Button {...defaultProps} />);
    const button = getByTestId('button');
    fireEvent(button, 'pressIn');
  });

  it('should start background color animation onPressOut', () => {
    const { getByTestId } = render(<Button {...defaultProps} />);
    const button = getByTestId('button');
    fireEvent(button, 'pressOut');
  });
});
