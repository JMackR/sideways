import { AnalyticsActionType, AnalyticsElementType } from './analytics-constants';

export interface AnalyticsScreenViewParams {
  screen_name: string;
  screen_route?: string;
  action_type: AnalyticsActionType.Show;
}

export interface AnalyticsEvent {
  screen_name?: string;
  screen_route?: string;
  event_name?: string;
  element_name?: string;
  element_type?: AnalyticsElementType;
  action_type?: AnalyticsActionType;
  description?: string;
  fatal?: boolean;
  error?: any;
  stackTrace?: any;
}
export interface EventArgs {
  screenName: string;
  eventName: string;
  elementName: string;
  elementType?: AnalyticsElementType;
  actionType?: AnalyticsActionType;
}
export const transformScreenViewParams = (screenName: string, screenRoute?: string): AnalyticsScreenViewParams => ({
  screen_name: screenName,
  screen_route: screenRoute,
  action_type: AnalyticsActionType.Show,
});

export const transformClickEventParams = (args: EventArgs): AnalyticsEvent => ({
  screen_name: args.screenName,
  event_name: args.eventName,
  element_name: args.elementName,
  element_type: args.elementType,
  action_type: args.actionType,
});
