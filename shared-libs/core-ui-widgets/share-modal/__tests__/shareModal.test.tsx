import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { ShareModal } from '../share-modal';
import { useNavigation } from '@react-navigation/native';

jest.mock('react-native-fs', () => ({
  writeFile: jest.fn(),
  TemporaryDirectoryPath: '/temporary/directory',
}));

jest.mock('react-native-share', () => ({
  open: jest.fn(),
}));
jest.mock('@upward/assets', () => ({
  CloseIcon: {
    SVG: 'MockCloseIconSVG',
  },
}));

jest.mock('@upward/core-ui-library', () => ({
  Button: jest.fn().mockImplementation(({ onClick, children, ...props }) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  )),
  Margin: jest.fn().mockImplementation(({ children, ...props }) => <div {...props}>{children}</div>),
  SVG: jest.fn().mockImplementation(({ children, ...props }) => <svg {...props}>{children}</svg>),
  Stack: jest.fn().mockImplementation(({ children, ...props }) => <div {...props}>{children}</div>),
  Text: jest.fn().mockImplementation(({ children, ...props }) => <span {...props}>{children}</span>),
  Touchable: jest.fn().mockImplementation(({ onPress, children, ...props }) => (
    <button onClick={onPress} {...props}>
      {children}
    </button>
  )),
}));
jest.mock('@upward/core-ui-widgets', () => ({
  Dialog: ({ children }) => <div>{children}</div>,
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
  useRoute: () => ({
    params: {
      card: {
        mobileIdCardDetails: [
          { id: 1, actualFileName: 'image1.png', uploadFile: 'base64data1' },
          { id: 2, actualFileName: 'image2.png', uploadFile: 'base64data2' },
        ],
      },
    },
  }),
}));
jest.mock('react-native-share', () => ({
  open: jest.fn().mockResolvedValue({ message: 'success' }),
}));

jest.mock('react-native-fs', () => ({
  writeFile: jest.fn().mockResolvedValue(),
  TemporaryDirectoryPath: '/temporary/directory',
}));

jest.mock('@upward/analytics', () => ({
  AnalyticsController: {
    trackClickableEvent: jest.fn(),
  },
  AnalyticsEvent: {
    Share_Continue: 'Share_Continue',
    Share_Continue_Button: 'Share_Continue_Button',
    Share_Complete: 'Share_Complete',
    Share_Button: 'Share_Button',
  },
}));
describe('ShareModal component', () => {
  it('renders without crashing', () => {
    const goBackMock = jest.fn();
    useNavigation.mockReturnValue({
      goBack: goBackMock,
    });
    render(<ShareModal />);
  });

  it('displays the "Share carefully" text', () => {
    const { getByTestId } = render(<ShareModal />);
    expect(getByTestId('Share_Carefully')).toBeTruthy();
  });

  it('calls onClose function when close button is pressed', async () => {
    const goBackMock = jest.fn();
    useNavigation.mockReturnValue({
      goBack: goBackMock,
    });
    const { getByTestId } = render(<ShareModal />);
    const closeButton = getByTestId('Close_Button');
    fireEvent.press(closeButton);
    await waitFor(() => expect(goBackMock).toHaveBeenCalled());
  });

  it('displays the "Share description" text', () => {
    const { getByTestId } = render(<ShareModal />);
    expect(getByTestId('Share_Description')).toBeTruthy();
  });

  it('calls onClose function when cancel button is pressed', async () => {
    const goBackMock = jest.fn();
    useNavigation.mockReturnValue({
      goBack: goBackMock,
    });
    const { getByTestId } = render(<ShareModal />);
    const cancelButton = getByTestId('Cancel_Button');
    fireEvent.press(cancelButton);
    await waitFor(() => expect(goBackMock).toHaveBeenCalled());
  });

  it('calls onContinue function when continue button is pressed', async () => {
    const { getByTestId } = render(<ShareModal />);
    const continueButton = getByTestId('Continue_Button');
    fireEvent.press(continueButton);
  });
});
