import { GTAG_EVENT_EXCEPTION } from '../analytics-constants';
import { AnalyticsDebug } from '../analytics-debug';
import { logEvent } from '../analytics-event-logger';

jest.mock('./analytics-event-logger', () => ({
  logEvent: jest.fn(),
}));

describe('AnalyticsDebug', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('logInfo', () => {
    test('should call crashlytics.log with message', () => {
      const message = 'test message';
      AnalyticsDebug.logInfo(message);
    });
  });

  describe('logError', () => {
    test('should call logEvent with error details', () => {
      const error = new Error('test error');
      AnalyticsDebug.logError(error);

      expect(logEvent).toHaveBeenCalledWith(GTAG_EVENT_EXCEPTION, {
        description: `${error}`,
        fatal: false,
      });
    });
  });
});
