import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';

jest.useFakeTimers();
jest.runOnlyPendingTimers();
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
jest.mock('react-native-device-info', () => require('react-native-device-info/jest/react-native-device-info-mock'));

jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native-localize', () => ({}));

jest.mock('react-native', () => {
  const rn = jest.requireActual('react-native');
  const spy = jest.spyOn(rn.Animated, 'View', 'get');
  spy.mockImplementation(() => jest.fn(({ children }) => children));
  return rn;
});

const mockedFirebaseCrashlyticsLog = jest.fn();
const mockedFirebaseCrashlyticsRecordError = jest.fn();

jest.mock('@react-native-firebase/crashlytics', () => {
  return () => ({
    log: mockedFirebaseCrashlyticsLog,
    recordError: mockedFirebaseCrashlyticsRecordError,
  });
});

const mockedFirebaseAuthSignInWithCustomToken = jest.fn();
jest.mock('@react-native-firebase/auth', () => () => {
  return {
    signInWithCustomToken: mockedFirebaseAuthSignInWithCustomToken,
  };
});
jest.mock('react-native-safe-area-context', () => require('react-native-safe-area-context/jest/mock').default);

jest.mock('react-i18next', () => ({
  ...jest.requireActual('react-i18next'),
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({ goBack: jest.fn() }),
    useRoute: jest.fn(),
    useFocusEffect: jest.fn(),
  };
});

const mockedFirebaseAnalyticsLogEvent = jest.fn();
const mockedFirebaseAnalyticsLogLogin = jest.fn();
const mockedFirebaseAnalyticsSetUserId = jest.fn();
jest.mock('@react-native-firebase/analytics', () => () => {
  return {
    logEvent: mockedFirebaseAnalyticsLogEvent,
    logLogin: mockedFirebaseAnalyticsLogLogin,
    setUserId: mockedFirebaseAnalyticsSetUserId,
  };
});
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
jest.mock('react-native-keyboard-manager', () => require('react-native-keyboard-manager/jest/mock'));

jest.mock('react-native-localize', () => ({}));

jest.mock('react-native-keychain', () => ({
  setGenericPassword: jest.fn(() => Promise.resolve('mockPass')),
  getGenericPassword: jest.fn(() => Promise.resolve('mockPass')),
  resetGenericPassword: jest.fn(() => Promise.resolve(null)),
}));

jest.mock('react-native-config', () => ({
  __esModule: true,
  default: () => ({
    setDefaults: jest.fn(),
  }),
}));
jest.mock('react-native-image-picker', () => {
  return {
    launchCamera: jest.fn(),
    launchImageLibrary: jest.fn(),
    openPicker: jest.fn(),
  };
});

import { http, HttpResponse, delay } from 'msw';
import { setupServer } from 'msw/node';

export const handlers = [
  http.get('https://api/user', async () => {
    await delay(150);
    return HttpResponse.json('John Smith');
  }),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());
