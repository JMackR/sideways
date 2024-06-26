import { render, fireEvent } from '@testing-library/react-native';
import { LoginHelpDialog } from '../login-help-dialog';
import { useNavigation } from '@react-navigation/native';

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn().mockReturnValue({
    t: jest.fn((key) => key),
  }),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

describe('LoginHelpDialog', () => {
  it('renders text with correct content and testIDs', () => {
    const { getByTestId } = render(<LoginHelpDialog />);
    expect(getByTestId('need_help')).toBeTruthy();
    expect(getByTestId('message_1')).toBeTruthy();
    expect(getByTestId('message_2')).toBeTruthy();
    expect(getByTestId('message_4')).toBeTruthy();
  });
  it('renders without crashing', () => {
    useNavigation.mockReturnValue({
      goBack: jest.fn(),
    });
    render(<LoginHelpDialog />);
  });

  it('calls navigation.goBack() when close button is clicked', () => {
    const mockGoBack = jest.fn();
    useNavigation.mockReturnValue({
      goBack: mockGoBack,
    });
    const { getByTestId } = render(<LoginHelpDialog />);
    const closeButton = getByTestId('close');
    fireEvent.press(closeButton);
  });
});
