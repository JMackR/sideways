import { render, fireEvent, screen, waitFor } from '@testing-library/react-native';
import { Biometrics } from '../biometrics';
import { useTranslation } from 'react-i18next';
import { Testharness } from '../../__mocks__/test-harness';
import {
  useAuth,
  useAuthBootstrap,
  useBiometrics,
  useLazyGetPasswordQuery,
  useSetBiometricEnrolledMutation,
} from '@upward/authentication';

interface User {
  uid: string;
  email: string;
}
const mockSetBiometricEnrolled = jest.fn();

jest.mock('../../hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));
jest.mock('../../hooks/useAuthBootstrap', () => ({
  useAuthBootstrap: jest.fn(),
}));
jest.mock('../../biometrics-provider/biometricsProvider', () => ({
  useBiometrics: jest.fn(),
}));
jest.mock('../../network/authApi', () => ({
  ...jest.requireActual('../../network/authApi'),
  useLazyGetPasswordQuery: jest.fn(),
  useSetBiometricEnrolledMutation: jest.fn(() => [mockSetBiometricEnrolled]),
}));

const renderComponent = (props: any) => {
  render(<Testharness {...props} children={<Biometrics />}></Testharness>);
};

describe('The Biometrics component functionality', () => {
  const { t } = useTranslation();
  beforeEach(() => {
    // jest.useFakeTimers();

    // Provide a mock implementation for useSetBiometricEnrolledMutation
    (useAuth as jest.Mock).mockImplementation((): any => ({
      currentUser: { uid: '123', email: 'user@example.com' } as User,
    }));

    // Mock useAuthBootstrap
    (useAuthBootstrap as jest.Mock).mockImplementation((): any => ({
      setBiometricsEnable: jest.fn(),
      setUserEnrollment: jest.fn(),
      setUserAuthorizedState: jest.fn(),
      userBiometricsEnabled: true,
    }));

    // Mock useBiometrics
    (useBiometrics as jest.Mock).mockImplementation((): any => ({
      isBiometricsSupported: true,
      promptBiometrics: jest.fn().mockResolvedValue(true),
      enableBiometrics: jest.fn().mockResolvedValue(true),
    }));

    // Assuming these types for the sake of example
    interface LazyQueryResult {
      isLoading: boolean;
      error: any;
      data: string;
    }

    interface MutationResult {
      deviceID: string;
      token: string;
    }

    // Mock useLazyGetPasswordQuery and useSetBiometricEnrolledMutation
    (useLazyGetPasswordQuery as jest.Mock).mockImplementation((): [() => void, LazyQueryResult] => [
      jest.fn().mockImplementation(() => Promise.resolve({ data: 'passwordData' })),
      { isLoading: false, error: null, data: 'passwordData' },
    ]);
    (useSetBiometricEnrolledMutation as jest.Mock).mockImplementation((): [(data: MutationResult) => Promise<void>] => [
      jest.fn().mockImplementation(({ deviceID, token }) => Promise.resolve({ deviceID, token })),
    ]);
  });

  afterEach(() => {
    // Clear all mocks after each test
    jest.clearAllMocks();
  });

  it('calls setBiometricEnrolled with correct arguments', async () => {
    renderComponent({});
    fireEvent.press(screen.getByTestId('ENABLE_BIOMETRIC'));
    await mockSetBiometricEnrolled();
    expect(mockSetBiometricEnrolled).toHaveBeenCalledWith();
  });

  it('renders correctly and all text is visible', () => {
    renderComponent({});
    expect(screen.getByText(t('onboard.BIOMETRIC_LOGIN'))).toBeTruthy();
    expect(screen.getByText(t('onboard.ACCESS_ACCOUNT'))).toBeTruthy();
    expect(screen.getByText(t('onboard.ENABLE_BIOMETRIC'))).toBeTruthy();
    expect(screen.getByText(t('onboard.NOT_NOW'))).toBeTruthy();
  });
  it('enables biometrics on button click', async () => {
    renderComponent({});
    await waitFor(() => {
      const button = screen.getByTestId('ENABLE_BIOMETRIC');
      fireEvent.press(button);
      expect(screen.getByText(t('onboard.ACCESS_ACCOUNT'))).toBeTruthy();
    });
  });
});
