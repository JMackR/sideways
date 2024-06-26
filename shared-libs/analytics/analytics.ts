import { transformClickEventParams, EventArgs, transformScreenViewParams } from './analytics-common';

import { logEvent } from './analytics-event-logger';
// import analytics from '@react-native-firebase/analytics';

const EVENT_NAME = 'event';

export class AnalyticsController {
  public static trackClickableEvent(args: EventArgs) {
    logEvent(EVENT_NAME, transformClickEventParams(args));
  }

  public static trackScreenView(screenName: string, screenRoute?: string) {
    analytics().logScreenView({
      screen_name: screenName,
      screen_class: screenRoute,
    });
    logEvent('screenview', transformScreenViewParams(screenName, screenRoute));
  }
  public static logError(error: any, stackTrace: any) {
    logEvent('mobile_error', { event_name: 'crash', fatal: true, error, stackTrace });
  }
}
