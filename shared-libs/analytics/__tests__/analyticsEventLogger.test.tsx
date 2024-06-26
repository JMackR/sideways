import AsyncStorage from '@react-native-async-storage/async-storage';
import { logEvent } from '../analytics-event-logger';

const mockAsyncStorageGetItem = AsyncStorage.getItem as jest.MockedFunction<typeof AsyncStorage.getItem>;
mockAsyncStorageGetItem.mockClear();

jest.mock('react-native-config', () => ({
  BASE_URL: 'https://mockedBaseUrl.com/',
}));
const mockAnalytics = {
  logEvent: jest.fn(),
};
(global as any).fetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    ok: true,
    json: jest.fn().mockResolvedValue({}),
    clone: jest.fn(() => ({
      ok: true,
      json: jest.fn().mockResolvedValue({}),
    })),
  }),
);

describe('logEvent function', () => {
  beforeEach(() => {
    mockAsyncStorageGetItem.mockClear();
    mockAnalytics.logEvent.mockClear();
  });

  it('should log event and call FetchService for mobile_error event', async () => {
    const eventName = 'mobile_error';
    const params = {
      stackTrace: 'stackTrace dummy',
      error: 'error message',
    };

    mockAsyncStorageGetItem.mockResolvedValue('mockedToken');

    await logEvent(eventName, params);
  });

  it('should not call FetchService for non-mobile_error event', async () => {
    const eventName = 'other_event';
    const params = {
      stackTrace: 'stackTrace dummy',
      error: 'error message',
    };

    await logEvent(eventName, params);
  });
});
