import { NavigableRoute, NavigationPayload } from '..';

export type NavigatorParamList = {
  [NavigableRoute.HOME_STACK]: NavigationPayload<undefined>;
  [NavigableRoute.NOTIFICATION_PERMISSION]: NavigationPayload<undefined>;
  [NavigableRoute.EMAIL_SIGNIN]: NavigationPayload<undefined>;
  [NavigableRoute.EMAIL_VERIFICATION]: NavigationPayload<{
    resetPhone: boolean;
    clientList: string[];
    email: string;
  }>;
  [NavigableRoute.PHONE_ENTRY]: NavigationPayload<{
    resetPhone: boolean;
    clientList: string[];
    email: string;
  }>;

  [NavigableRoute.PHONE_VERIFICATION]: NavigationPayload<undefined>;
  [NavigableRoute.MULTIPLE_ACCOUNT_SELECT]: NavigationPayload<{
    clientList: string[];
  }>;
  [NavigableRoute.BIOMETRICS]: NavigationPayload<{
    modalId: string;
    options: string[];
  }>;

  [NavigableRoute.CORE_UPDATE]: NavigationPayload<undefined>;
  [NavigableRoute.LOGIN_HELP]: NavigationPayload<undefined>;
  [NavigableRoute.FORCED_LOGOUT]: NavigationPayload<undefined>;
  [NavigableRoute.RE_AUTH]: NavigationPayload<{
    modalId: string;
    options: string[];
  }>;

  [NavigableRoute.APP_STACK]: NavigationPayload<undefined>;
  [NavigableRoute.ALERT_STATE]: NavigationPayload<{
    alertTitle: string;
    dependentID: string;
    unverifiedDependentAlert: object;
  }>;
  [NavigableRoute.ALERT_LANDING_STATE]: NavigationPayload<undefined>;

  [NavigableRoute.BENEFIT_STATE]: NavigationPayload<{ modalId: string }>;
  [NavigableRoute.LOGOUT_DIALOG]: NavigationPayload<undefined>;
  [NavigableRoute.DATE_PICKER]: NavigationPayload<undefined>;

  [NavigableRoute.ADD_MEMBER]: NavigationPayload<{
    modalId: string;
    options: string[];
  }>;
  [NavigableRoute.BIOMETRICS_ENABLE]: NavigationPayload<undefined>;
  [NavigableRoute.MEMBER_STATE]: NavigationPayload<{ modalId: string }>;

  [NavigableRoute.DOCUMENT_DETAIL]: NavigationPayload<{
    modalId: string;
    options: string[];
  }>;
  [NavigableRoute.FAQS_LANDING_STATE]: NavigationPayload<undefined>;
  [NavigableRoute.ALL_ID_CARDS_STATE]: NavigationPayload<{ modalId: string }>;

  [NavigableRoute.ID_CARD_STATE]: NavigationPayload<{
    modalId: string;
    options: string[];
  }>;
  [NavigableRoute.PRIVACY_LANDING_STATE]: NavigationPayload<undefined>;
  [NavigableRoute.UPLOAD_STATE]: NavigationPayload<{ modalId: string }>;

  [NavigableRoute.WAIVED_BENEFITS_STATE]: NavigationPayload<{
    modalId: string;
    options: string[];
  }>;
  [NavigableRoute.BILLING_DETAILS_STATE]: NavigationPayload<undefined>;
  [NavigableRoute.BILLING_MODAL_STATE]: NavigationPayload<undefined>;

  [NavigableRoute.PODCAST_STACK]: NavigationPayload<undefined>;
  [NavigableRoute.PODCAST_APP]: NavigationPayload<undefined>;
};
