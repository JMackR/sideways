// import crashlytics from '@react-native-firebase/crashlytics';
import { GTAG_EVENT_EXCEPTION } from './analytics-constants';
import { logEvent } from './analytics-event-logger';

export const AnalyticsDebug = {
  logInfo(message: string) {
    // crashlytics().log(message);
  },
  logError(error: Error) {
    // crashlytics().recordError(error);
    // TODO: Limit this to production
    logEvent(GTAG_EVENT_EXCEPTION, {
      description: `${error.name}: ${error.message}`,
      fatal: false,
    });
  },
};
