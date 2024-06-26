import { DatePicker, ScreenLoader, ShareModal } from '@upward/core-ui-widgets';

import { FullScreenModalOptions, ModalDialogOverlayOptions, PushPopStackAnimationOptions } from './common-options';

import { NavigableRoute } from '@upward/navigation';

export const authRoutes = [
  {
    name: 'EMAIL_SIGNIN',
    options: PushPopStackAnimationOptions,
    component: EmailSignin,
  },
  {
    name: 'EMAIL_VERIFICATION',
    options: PushPopStackAnimationOptions,
    component: EmailVerification,
  },
  {
    name: 'PHONE_ENTRY',
    options: PushPopStackAnimationOptions,
    component: PhoneEntry,
  },
  {
    name: 'PHONE_VERIFICATION',
    options: PushPopStackAnimationOptions,
    component: PhoneVerification,
  },
  {
    name: 'MULTIPLE_ACCOUNT_SELECT',
    options: PushPopStackAnimationOptions,
    component: ClientSelect,
  },
  {
    name: 'BIOMETRICS',
    options: PushPopStackAnimationOptions,
    component: Biometrics,
  },
  {
    name: 'CORE_UPDATE',
    options: ModalDialogOverlayOptions,
    component: CoreUpdateDialog,
  },
  {
    name: 'LOGIN_HELP',
    options: ModalDialogOverlayOptions,
    component: LoginHelpDialog,
  },
  {
    name: 'FORCED_LOGOUT',
    options: ModalDialogOverlayOptions,
    component: ForcedLogout,
  },
  {
    name: 'SCREEN_LOADER',
    options: ModalDialogOverlayOptions,
    component: ScreenLoader,
  },
  {
    name: 'NOTIFICATION_PERMISSION',
    options: PushPopStackAnimationOptions,
    component: NotificationPermission,
  },
];

export const commonRoutes = [
  {
    name: 'DATE_PICKER',
    options: ModalDialogOverlayOptions,
    component: DatePicker,
  },
  {
    name: 'ADD_MEMBER',
    options: ModalDialogOverlayOptions,
    component: AddMember,
  },
  {
    name: 'PUSH_NOTIFICATION',
    options: ModalDialogOverlayOptions,
    component: PushNotification,
  },
  {
    name: 'ZOOM_STATE',
    options: PushPopStackAnimationOptions,
    component: ZoomDialog,
  },
  {
    name: 'RETAKE_OPTIONS_STATE',
    options: ModalDialogOverlayOptions,
    component: RetakeOptionsDialog,
  },
  {
    name: 'UPLOAD_OPTIONS_STATE',
    options: ModalDialogOverlayOptions,
    component: UploadOptionsDialog,
  },
  {
    name: 'BILLING_DETAILS_STATE',
    options: FullScreenModalOptions,
    component: BillingDetails,
  },
  {
    name: NavigableRoute.BILLING_MODAL_STATE,
    options: ModalDialogOverlayOptions,
    component: BillingDialog,
  },
  {
    name: NavigableRoute.BENEFIT_DETAIL,
    component: BenefitDetail,
    options: FullScreenModalOptions,
  },
  {
    name: NavigableRoute.WAIVED_BENEFITS_STATE,
    component: WaivedBenefits,
    options: FullScreenModalOptions,
  },
  {
    name: NavigableRoute.DOCUMENT_DETAIL,
    component: DocumentDetail,
    options: FullScreenModalOptions,
  },
  {
    name: NavigableRoute.ALL_ID_CARDS_STATE,
    component: IdCardsScreen,
    options: FullScreenModalOptions,
  },
  {
    name: NavigableRoute.ID_CARD_STATE,
    component: IdCardDetail,
    options: FullScreenModalOptions,
  },
  {
    name: NavigableRoute.UPLOAD_STATE,
    component: Upload,
    options: FullScreenModalOptions,
  },
  {
    name: NavigableRoute.MEMBER_STATE,
    component: MemberDetail,
    options: FullScreenModalOptions,
  },
  {
    name: NavigableRoute.ALERT_LANDING_STATE,
    component: AlertsScreen,
    options: FullScreenModalOptions,
  },
  {
    name: NavigableRoute.ALERT_STATE,
    component: AlertDetail,
    options: FullScreenModalOptions,
  },
  {
    name: NavigableRoute.PRIVACY_LANDING_STATE,
    component: PrivacyLanding,
    options: FullScreenModalOptions,
  },
  {
    name: NavigableRoute.FAQS_LANDING_STATE,
    component: FAQsLanding,
    options: FullScreenModalOptions,
  },
  {
    name: NavigableRoute.BIOMETRICS_ENABLE,
    component: BiometricsEnable,
    options: FullScreenModalOptions,
  },
  {
    name: NavigableRoute.MANAGE_NOTIFICATIONS,
    component: NotificationsEnable,
    options: FullScreenModalOptions,
  },
  {
    name: NavigableRoute.SHARE_MODAL,
    options: ModalDialogOverlayOptions,
    component: ShareModal,
  },
  {
    name: NavigableRoute.LOGOUT_DIALOG,
    component: LogoutDialog,
    options: ModalDialogOverlayOptions,
  },
];
