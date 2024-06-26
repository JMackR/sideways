/**
 * Google GTAG Standard Events
 *
 * List of official event parameters can be found in
 * {@link https://developers.google.com/gtagjs/reference/event
 * the gtag.js reference documentation}.
 */

export const GTAG_EVENT_EXCEPTION = 'exception';
export const GTAG_EVENT_LOGIN = 'login';
export const GTAG_EVENT_SEARCH = 'search';
export const GTAG_EVENT_SIGN_UP = 'sign_up';
export const GTAG_EVENT_VIEW_ITEM = 'view_item';
export const GTAG_EVENT_VIEW_ITEM_LIST = 'view_item_list';

/**
 * app Events
 */
export const EVENT_APP_STATE_ACTIVE = 'open';
export const ITEM_SAVED_EVENT = 'item_saved';

/**
 * app Params
 */
export const EVENT_PARAM_EMAIL = 'Email';

export enum AnalyticsElementType {
  Banner = 'Banner',
  Button = 'Button',
  Card = 'Card',
  CheckBox = 'CheckBox',
  Clickable = 'Clickable',
  Dialogue = 'Dialogue',
  Error = 'Error',
  Face = 'Face',
  Icon = 'Icon',
  Image = 'Image',
  InputField = 'InputField',
  Link = 'Link',
  ListItem = 'ListItem',
  Text = 'Text',
  TextField = 'TextField',
  Toggle = 'Toggle',
  Touch = 'Touch',
}

export enum AnalyticsActionType {
  Click = 'Click',
  Delete = 'Delete',
  Deselect = 'Deselect',
  Dialogue = 'Dialogue',
  Select = 'Select',
  Show = 'Show',
}

export enum AnalyticsToggleValues {
  On = 'On',
  Off = 'Off',
}

export type AnalyticsElementTypeParam = keyof typeof AnalyticsElementType;
export type AnalyticsActionTypeParam = keyof typeof AnalyticsActionType;

export type AnalyticsI = {
  eventName: string;
  elementName: string;
  elementType?: AnalyticsElementType;
  actionType?: AnalyticsActionType;
};

export enum AnalyticsEvent {
  Add_Dependent = 'add_dependent',
  Add_Dependent_Button = 'add_dependent_button',
  Add_Document = 'add_document',
  Add_Document_Button = 'add_document_button',
  Add_Document_Plus = 'add_document_plus',
  Add_ID_Card = 'add_id_card',
  Add_ID_Card_Plus = 'add_id_card_plus',
  Alerts_Item = 'alerts_item',
  Alert_Selected = 'alert_selected',
  Alerts_Bar = 'alerts_bar',
  Alerts_Notification = 'alerts_notification',
  Benefit_Detail = 'benefit_detail',
  Benefit_View_More = 'benefit_view_more',
  Biomentrics_Disabled = 'biometrics_disabled',
  Biometrics = 'biometrics',
  Biometrics_Enabled = 'biometrics_enabled',
  Biometrics_Login = 'biometrics_login',
  Call = 'call',
  Call_Button = 'call_button',
  Camera_Card = 'camera_card',
  Camera_Upload = 'camera_upload',
  Card_Front = 'card_front',
  Card_Back = 'card_back',
  Client_Login = 'client_login',
  Date_Picker = 'date_picker',
  Dependent = 'dependent',
  Dependent_Selected = 'dependent_selected',
  Desktop_View = 'desktop_view',
  Document_Item = 'document_item',
  Document_Title = 'document_title',
  Documents = 'documents',
  Duplicate_Phone = 'duplicate_phone',
  Edit_Details = 'edit_details',
  Email_Login = 'email_login',
  Email_Registration = 'email_registration',
  Enroll_Now_Button = 'enroll_now_button',
  Enroll_Now_Selected = 'enroll_now_selected',
  File_Card = 'file_card',
  File_Library = 'file_library',
  Image = 'image',
  Learn_More_Button = 'learn_more_button',
  Learn_More_Selected = 'learn_more_selected',
  Login = 'login',
  Login_Help = 'login_help',
  Logout = 'logout',
  More_Alerts = 'more_alerts',
  More_Billing = 'more_billing',
  More_Faq = 'more_faq',
  More_Feedback = 'more_feedback',
  More_Privacy_Policy = 'more_privacy_policy',
  More_Settings_Biometrics = 'settings_biometrics',
  More_Manage_Notifications = 'more_manage_notifications',
  Navigate = 'navigate',
  Notifications_Disabled = 'notifications_disabled',
  Personal_Details = 'personal_details',
  Phone_SignIn = 'phone_signin',
  Photo_Card = 'photo_card',
  Photo_Library = 'photo_library',
  Photo_Retake = 'photo_retake',
  Registration = 'registration',
  Reset_Biometrics = 'reset_biometris',
  Returning_User_Login = 'returning_user_login',
  Replace_File_Back = 'replace_file_back',
  Replace_File_Front = 'replace_file_front',
  Select_A_Document_Type = 'select_a_document_type',
  Select_A_Family_Member = 'select_a_family_member',
  Token_Signin = 'token_signin',
  Update_Phone = 'update_phone',
  Upload_Document = 'upload_document',
  Upload_Document_Button = 'upload_document_button',
  Upload_Option = 'upload_option',
  Verify_phone = 'verify_phone',
  View_All = 'view_all',
  View_All_Cards = 'view_all_cards',
  View_Details = 'view_details',
  View_Document = 'view_document',
  View_Document_Details = 'view_document_details',
  View_ID_Card = 'view_id_card',
  View_Waived_Plans = 'view_waived_plans',
  Visit = 'visit',
  Visit_Button = 'visit_button',
  Waived_Plans = 'waived_plans',
  Billing_View_Statements = 'view_statements',
  Billing_Manage_Payments = 'manage_payment',
  Billing_View_More_Details = 'view_more_details',
  Share_ID_Card = 'Share_id_card',
  Share_ID_Card_Button = 'Share_id_card_button',
  Share_Continue = 'Share_continue',
  Share_Continue_Button = 'Share_continue_button',
  Share_Complete = 'Share_complete',
  Share_Button = 'Share_button',
  Elevate_Learn_More_Button = 'learn_more_button',
}
