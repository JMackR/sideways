import { transformScreenViewParams, transformClickEventParams } from '../analytics-common';
import { AnalyticsActionType, AnalyticsElementType } from '../analytics-constants';

describe('Analytics Functions', () => {
  describe('transformScreenViewParams', () => {
    test('transforms screen view parameters with screen route', () => {
      const screenName = 'Home';
      const screenRoute = '/home';
      const expectedParams = {
        screen_name: screenName,
        screen_route: screenRoute,
        action_type: AnalyticsActionType.Show,
      };
      expect(transformScreenViewParams(screenName, screenRoute)).toEqual(expectedParams);
    });

    test('transforms screen view parameters without screen route', () => {
      const screenName = 'Profile';
      const expectedParams = {
        screen_name: screenName,
        action_type: AnalyticsActionType.Show,
      };
      expect(transformScreenViewParams(screenName)).toEqual(expectedParams);
    });
  });

  describe('transformClickEventParams', () => {
    test('transforms click event parameters', () => {
      const args = {
        screenName: 'Home',
        eventName: 'Button Click',
        elementName: 'Submit Button',
        elementType: AnalyticsElementType.Button,
        actionType: AnalyticsActionType.Click,
      };
      const expectedParams = {
        screen_name: args.screenName,
        event_name: args.eventName,
        element_name: args.elementName,
        element_type: args.elementType,
        action_type: args.actionType,
      };
      expect(transformClickEventParams(args)).toEqual(expectedParams);
    });
  });
});
