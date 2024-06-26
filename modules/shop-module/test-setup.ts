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
// eslint-disable-next-line @typescript-eslint/no-var-requires
jest.mock('react-native-safe-area-context', () => require('react-native-safe-area-context/jest/mock').default);

// jest.mock('react-native', () => ({
//   ...jest.requireActual('react-native'),
//   useWindowDimensions: jest.fn().mockReturnValue({ width: 500, height: 500 }), // Provide a mock implementation
// }));

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

// Mock the useNavigation hook
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      goBack: jest.fn(),
      dispatch: jest.fn(),
    }),
    useRoute: jest.fn(),
    useFocusEffect: jest.fn(),
    StackActions: {
      replace: jest.fn().mockImplementation((routeName) => ({
        type: 'REPLACE',
        routeName,
      })),
    },
  };
});

jest.mock('react-native/Libraries/Linking/Linking', () => ({
  openURL: jest.fn(() => Promise.resolve('mockResolve')),
}));
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
jest.mock('react-native-image-crop-picker', () => {
  return {
    launchCamera: jest.fn(),
    launchImageLibrary: jest.fn(),
    openPicker: jest.fn(),
  };
});
jest.mock('react-native-document-picker', () => ({ default: jest.fn() }));

jest.mock('react-native-branch', () => {
  const REACT_NATIVE = jest.requireActual('react-native');
  REACT_NATIVE.NativeModules.RNBranch = {
    logEvent: jest.fn(() => true),
  };
  const actualModule = jest.requireActual('react-native-branch');
  const mockedModule = {
    __esModule: true,
    ...actualModule,
    BranchEvent: jest.fn().mockImplementation((...args) => new actualModule.BranchEvent(...args)),
  };
  mockedModule.BranchEvent.Login = 'LOGIN';
  mockedModule.default.createBranchUniversalObject = jest.fn((...args) => ({
    ident: 'MOCK-IDENT',
    ...args,
  }));
  return mockedModule;
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

jest.mock('@braze/react-native-sdk', () => {
  return {
    registerAndroidPushToken: jest.fn(),
    registerPushToken: jest.fn(),
    setGoogleAdvertisingId: jest.fn(),
    setFirstName: jest.fn(),
    setLastName: jest.fn(),
    setLanguage: jest.fn(),
    setEmail: jest.fn(),
    setPhoneNumber: jest.fn(),
    changeUser: jest.fn(),
    getUserId: jest.fn(),
    setSdkAuthenticationSignature: jest.fn(),
    addAlias: jest.fn(),
    logCustomEvent: jest.fn(),
    logPurchase: jest.fn(),
    setCountry: jest.fn(),
    setHomeCity: jest.fn(),
    setDateOfBirth: jest.fn(),
    setAttributionData: jest.fn(),
    launchNewsFeed: jest.fn(),
    getNewsFeedCards: jest.fn(),
    logNewsFeedCardClicked: jest.fn(),
    logNewsFeedCardImpression: jest.fn(),
    launchContentCards: jest.fn(),
    getContentCards: jest.fn(),
    getCachedContentCards: jest.fn(),
    logContentCardClicked: jest.fn(),
    logContentCardDismissed: jest.fn(),
    logContentCardImpression: jest.fn(),
    processContentCardClickAction: jest.fn(),
    requestFeedRefresh: jest.fn(),
    requestImmediateDataFlush: jest.fn(),
    enableSDK: jest.fn(),
    disableSDK: jest.fn(),
    wipeData: jest.fn(),
    setDateCustomUserAttribute: jest.fn(),
    setCustomUserAttributeArray: jest.fn(),
    setCustomUserAttributeObject: jest.fn(),
    setCustomUserAttributeObjectArray: jest.fn(),
    setBoolCustomUserAttribute: jest.fn(),
    setStringCustomUserAttribute: jest.fn(),
    setIntCustomUserAttribute: jest.fn(),
    setDoubleCustomUserAttribute: jest.fn(),
    incrementCustomUserAttribute: jest.fn(),
    setGender: jest.fn(),
    addToSubscriptionGroup: jest.fn(),
    removeFromSubscriptionGroup: jest.fn(),
    setPushNotificationSubscriptionType: jest.fn(),
    setEmailNotificationSubscriptionType: jest.fn(),
    addToCustomUserAttributeArray: jest.fn(),
    removeFromCustomUserAttributeArray: jest.fn(),
    unsetCustomUserAttribute: jest.fn(),
    getCardCountForCategories: jest.fn(),
    getUnreadCardCountForCategories: jest.fn(),
    getInitialURL: jest.fn(),
    getDeviceId: jest.fn(),
    requestLocationInitialization: jest.fn(),
    requestGeofences: jest.fn(),
    setLocationCustomAttribute: jest.fn(),
    requestContentCardsRefresh: jest.fn(),
    subscribeToInAppMessage: jest.fn(),
    hideCurrentInAppMessage: jest.fn(),
    logInAppMessageClicked: jest.fn(),
    logInAppMessageImpression: jest.fn(),
    logInAppMessageButtonClicked: jest.fn(),
    performInAppMessageAction: jest.fn(),
    setLastKnownLocation: jest.fn(),
    requestPushPermission: jest.fn(),
    getFeatureFlag: jest.fn(),
    getAllFeatureFlags: jest.fn(),
    refreshFeatureFlags: jest.fn(),
    logFeatureFlagImpression: jest.fn(),
    getFeatureFlagBooleanProperty: jest.fn(),
    getFeatureFlagNumberProperty: jest.fn(),
    getFeatureFlagStringProperty: jest.fn(),
  };
});
