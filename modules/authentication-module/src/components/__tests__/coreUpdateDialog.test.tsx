import { render, fireEvent } from '@testing-library/react-native';
import { CoreUpdateDialog } from '../core-update-dialog';

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn().mockReturnValue({
    t: (key) => key,
  }),
}));
jest.mock('react-native', () => {
  const originalReactNative = jest.requireActual('react-native');
  return {
    ...originalReactNative,
    Linking: {
      ...originalReactNative.Linking,
      canOpenURL: jest.fn(),
      openURL: jest.fn(),
    },
  };
});

describe('CoreUpdateDialog', () => {
  it('renders correctly', () => {
    render(<CoreUpdateDialog />);
  });

  it('opens app store link on button click', async () => {
    const { getByTestId } = render(<CoreUpdateDialog />);
    const button = getByTestId('button');
    fireEvent.press(button);
  });

  it('displays correct text', () => {
    const { getByTestId } = render(<CoreUpdateDialog />);
    const title = getByTestId('title');
    const startText = getByTestId('start_text');

    expect(title.props.children).toBe('onboard.UPDATE_REQUIRED_TITLE_TXT');
    expect(startText.props.children).toBe('onboard.UPDATE_REQUIRED_START_TXT');
  });
});
