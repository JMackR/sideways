// import analytics from '@react-native-firebase/analytics';
import type { AnalyticsEvent } from './analytics-common';

export const logEvent = async (eventName: string, params: AnalyticsEvent, postLogs?: any) => {
  analytics().logEvent(eventName, params);
};
