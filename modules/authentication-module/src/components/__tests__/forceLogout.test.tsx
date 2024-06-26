import { render, fireEvent } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { ForcedLogout } from '../force-logout';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

describe('ForcedLogout component', () => {
  beforeEach(() => {
    useNavigation.mockClear();
    useTranslation.mockClear();
  });
  const navigation = { goBack: jest.fn() };
  const t = jest.fn().mockReturnValue('text');

  useNavigation.mockReturnValue(navigation);
  useTranslation.mockReturnValue({ t });

  it('renders without crashing', () => {
    const { getByText, getByTestId } = render(<ForcedLogout />);
    expect(getByText('text')).toBeTruthy();
    expect(getByTestId('circle-x-icon')).toBeTruthy();
  });

  it('calls navigation.goBack when pressing the close button', () => {
    const { getByTestId } = render(<ForcedLogout />);
    fireEvent.press(getByTestId('circle-x-icon'));
    expect(navigation.goBack).toHaveBeenCalled();
  });
});
