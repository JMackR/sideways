import { AnalyticsController } from '../analytics';
import { logEvent } from '../analytics-event-logger';
import { EventArgs, transformClickEventParams, transformScreenViewParams } from '../analytics-common';

jest.mock('@react-native-firebase/analytics', () => ({
  __esModule: true,
  default: () => ({
    logScreenView: jest.fn(),
  }),
}));

jest.mock('./analytics-event-logger', () => ({
  logEvent: jest.fn(),
}));

describe('AnalyticsController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('trackClickableEvent', () => {
    it('should call logEvent with correct parameters', () => {
      const args: EventArgs = { screenName: '', eventName: '', elementName: '' };
      AnalyticsController.trackClickableEvent(args);

      expect(logEvent).toHaveBeenCalledWith('event', transformClickEventParams(args));
    });
  });

  describe('trackScreenView', () => {
    it('should call analytics().logScreenView and logEvent with correct parameters', () => {
      const screenName = 'Home';
      const screenRoute = 'home';

      AnalyticsController.trackScreenView(screenName, screenRoute);
      expect(logEvent).toHaveBeenCalledWith('screenview', transformScreenViewParams(screenName, screenRoute));
    });
  });

  describe('logError', () => {
    it('should call logEvent with correct parameters', () => {
      const error = 'Example error';
      const stackTrace = [{ line: 1, file: 'example.js' }];

      AnalyticsController.logError(error, stackTrace);

      expect(logEvent).toHaveBeenCalledWith('mobile_error', { event_name: 'crash', fatal: true, error, stackTrace });
    });
  });
});
