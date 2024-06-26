jest.mock('@braze/react-native-sdk', () => ({
  initialize: jest.fn(),
  trackEvent: jest.fn(),
}));
