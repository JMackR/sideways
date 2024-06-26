import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';
import 'whatwg-fetch';
import React from 'react';
// import fetchMock from 'jest-fetch-mock';

// fetchMock.enableMocks();

jest.useFakeTimers();
jest.runOnlyPendingTimers();
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
// import mockRNDeviceInfo from 'react-native-device-info/jest/react-native-device-info-mock';
jest.mock('react-native-device-info', () => require('react-native-device-info/jest/react-native-device-info-mock'));
// const mockUseEffect = jest.spyOn(React, 'useEffect');
// mockUseEffect.mockImplementationOnce((f) => setImmediate(() => f()));

jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
// jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper')

// jest.mock('react-native-share', () => ({
// 	default: jest.fn(),
// }))

jest.mock('react-native-localize', () => ({}));

// For animating components
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

// jest.mock('@reduxjs/toolkit/query/react', () => ({
//   useSelector: jest.fn(),
// }));
// jest.mock('react-redux', () => {
//   return {
//     ...jest.requireActual('react-redux'),
//     useSelector: jest.fn(),
//     //useDispatch: () => jest.fn(), if you also want to mock dispatch
//   };
// });
// jest.mock('@reduxjs/toolkit/query/react', () => ({
//   __esModule: true,
//   default: () => () => { data: 'whatever you want' },
// }))
// jest.mock('react-redux', () => ({
//   __esModule: true,
//   default: () => () => { data: 'whatever you want' },
// }))

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

// import { server } from './test/server'

// // make debug output for TestingLibrary Errors larger
// process.env.DEBUG_PRINT_LIMIT = '15000'

// // enable API mocking in test runs using the same request handlers
// // as for the client-side mocking.
// beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
// afterAll(() => server.close())
// afterEach(() => server.resetHandlers())
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
